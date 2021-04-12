import type {} from 'bootstrap'
import {ContentfulClientApi, createClient, Entry, EntryCollection, Field} from 'contentful'
import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {FieldExtensionSDK} from 'contentful-ui-extensions-sdk'
import QRCode from 'easyqrcodejs'
import get from 'lodash-es/get'
import has from 'lodash-es/has'
import {Component, createRef, h, JSX, RefObject, render} from 'preact'

import { AsyncErrorHandler } from '../lib/async-error-handler'
import { injectBootstrap } from '../lib/utils'
const template = require('es6-dynamic-template')

declare function require(module: string): any
const styles = require('./style.scss')

interface IEntryValue { value: string }

interface IAppState {
  value: IEntryValue | null,
  wait?: boolean,
  error?: any | null
  initialized: boolean
}

interface IInstallationParams {
}

interface IInstanceParams {
}

interface IInvocationParams {
}

interface IProps extends Partial<FieldExtensionSDK> {
  client?: ContentfulClientApi
}

export class QRCodeGenerator extends Component<IProps, IAppState> {
  private readonly errorHandler = new AsyncErrorHandler(this)
  private readonly qrcode: RefObject<HTMLDivElement>
  private code: QRCode

  constructor(props: IProps, context?: any) {
    super(props, context)

    this.state = {
      value: null,
      wait: false,
      error: null,
      initialized: false,
    }

    this.qrcode = createRef()
    this.componentDidMount = this.errorHandler.wrap(this, this.componentDidMount)
  }

  public params(): IInstallationParams & IInstanceParams & IInvocationParams {
    const params: contentfulExtension.ParametersAPI = this.props.parameters || ({} as any)
    return Object.assign({},
      params.installation,
      params.instance,
      params.invocation) as any
  }

  public async componentDidMount() {
    const sdk = this.props

    let value: string | undefined = undefined
    if (sdk && sdk.field) {
      sdk.field.onValueChanged(this.onValueChanged)

      // initialize visible state
      value = sdk.field.getValue()
    }

    this.onValueChanged(value)
    this.setState({ initialized: true })
  }

  public render() {
    const { value, wait: loading, initialized, error } = this.state

    return <div className={`qr-code-generator container-fluid ${error ? 'error' : ''}`}>
      <div className="row">
        {error && <div>
            <h1>Error!</h1>
            <pre>
              {error.message}
            </pre>
          </div>}
        <div className="col-12">
          <input className="cf-form-input" data-testid="input"
            disabled={initialized == false}
            value={value ? value.value : ''}
            onInput={this.onKeyDown} />
        </div>
        <div className="col-12" ref={this.qrcode}>
          <div className="loader" style={{visibility: loading ? 'visible' : 'hidden'}} />
        </div>
      </div>
    </div>
  }

  private update = async (value: IEntryValue | null) => {
    const sdk = this.props

    if (sdk && sdk.field) {
      await sdk.field.setValue(value ? value.value : null)
    } else {
      // call onValueChanged directly instead of waiting for round-trip through UI sdk
      this.onValueChanged(value ? value.value : null)
    }
    this.validate(value)
  }

  private validate = (value: IEntryValue | null) => {
    const sdk = this.props
    if (sdk && sdk.field) {
      sdk.field.setInvalid(false)
    }
  }

  private onKeyDown: JSX.GenericEventHandler<HTMLInputElement> = (evt) => {
    const newLabel = typeof evt == 'string' ? evt : (evt.target as HTMLInputElement).value

    const newValue: IEntryValue = {
      value: newLabel,
    }
    this.update(newValue)
    this.setState({
      value: newValue,
    })
  }

  private onValueChanged = (newValue: string | undefined | null) => {
    if (!this.qrcode.current) { return }
    $(this.qrcode.current).empty()

    this.code = new QRCode(this.qrcode.current, {
      text: newValue,
      logo: 'https://watermarkchurch.github.io/wm-contentful-ui-extensions/images/logo-blue.svg',
      logoWidth: 64,
      logoHeight: 64,
      drawer: 'canvas',
    })
  }
}

function getOrTemplate(entry: Entry<any>, selector: string): string {
  if (has(entry, selector)) {
    return get(entry, selector)
  } else if (has(entry.fields, selector)) {
    return get(entry.fields, selector)
  } else {

    return template(selector, {
        // allow `${sys.space.sys.id} and ${fields.name}`
      ...entry,
        // allow `${id}` as shorthand
      id: entry.sys.id,
        // allow `${name}` as shorthand`
      ...entry.fields,
    })
  }
}

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<QRCodeGenerator />,
    document.getElementById('react-root')!)
})
