import type {} from 'bootstrap'
import {ContentfulClientApi, createClient, Entry, EntryCollection, Field} from 'contentful'
import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {FieldExtensionSDK} from 'contentful-ui-extensions-sdk'
import QRCode from 'easyqrcodejs'
import get from 'lodash-es/get'
import has from 'lodash-es/has'
import {Component, createRef, h, JSX, RefObject, render} from 'preact'
import { HexColorPicker } from 'react-colorful'

import { AsyncErrorHandler } from '../lib/async-error-handler'
import { debounce, injectBootstrap } from '../lib/utils'
import { ImageSelect } from './image-select'

const template = require('es6-dynamic-template')

declare function require(module: string): any
const styles = require('./style.scss')

interface IEntryValue { value: string }

interface IAppState {
  value: IEntryValue | null,
  wait?: boolean,
  error?: any | null
  initialized: boolean

  logo?: string
  color: string
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
      color: '#000000',
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
    const { value, wait: loading, logo, initialized, error } = this.state

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
        <div className="col-12 col-md-6">
          <div className="qrcode-container" ref={this.qrcode}>
            <div className="loader" style={{visibility: loading ? 'visible' : 'hidden'}} />
          </div>
          {this.state.value &&
            <a href="#" onClick={(e) => {
              e.preventDefault()
              download('qrcode.svg', $('.qrcode-container').html())
            }}>Download as SVG</a>}
        </div>
        <div className="col-12 col-md-6">
          <h4>Choose Image</h4>
          <ImageSelect selected={logo} onSelected={(l) => {
            this.setState({logo: l || null})
            this.update(this.state.value)
          }} />
        </div>
        <div className="col-12 col-md-6 offset-md-6">
          <h4>Color</h4>
          <input type="text"
            value={this.state.color}
            onChange={(e: any) => {
              this.setState({ color: e.target.value })
              this.update(this.state.value)
            }} />
          <HexColorPicker color={this.state.color} onChange={(newColor) => {
            this.setState({ color: newColor })
            this.update(this.state.value)
          }} />
        </div>
      </div>
    </div>
  }

  // This is a function not a member, it just happens to confuse tslint
  // due to the debounce wrapper
  // tslint:disable-next-line: member-ordering
  private update = debounce(async (value: IEntryValue | null) => {
    const sdk = this.props

    if (sdk && sdk.field) {
      await sdk.field.setValue(value ? value.value : null)
    } else {
      // call onValueChanged directly instead of waiting for round-trip through UI sdk
      this.onValueChanged(value ? value.value : null)
    }
    this.validate(value)
  }, 40)

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
      logo: this.state.logo,
      colorDark: this.state.color,
      ...(this.state.logo && {
        logoWidth: 64,
        logoHeight: 64,
      }),
      drawer: 'svg',
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

function download(filename: string, text: string) {
  let element = document.createElement('a')
  element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
