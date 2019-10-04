import {} from 'bootstrap'
import {ContentfulClientApi, createClient, Entry, Field} from 'contentful'
import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {FieldExtensionSDK} from 'contentful-ui-extensions-sdk'
import get from 'lodash-es/get'
import has from 'lodash-es/has'
import {Component, h, render} from 'preact'

import { AsyncErrorHandler } from '../lib/async-error-handler'
import { injectBootstrap } from '../lib/utils'
const template = require('es6-dynamic-template')

declare function require(module: string): any
const styles = require('./style.scss')

if (contentfulExtension) {
  contentfulExtension.init((extension: FieldExtensionSDK) => {
    try {
    render(<CrossSpaceLinkEditor {...extension} />,
      document.getElementById('react-root'))
    extension.window.startAutoResizer()
    } catch (ex) {
      console.error('Error initializing', ex)
    }
  })
}

interface IEntryValue { value: string, label: string, entry?: Entry<any> }

interface IAppState {
  value: IEntryValue | null,
  possibilities: IEntryValue[],
  visiblePossibilities: IEntryValue[],
  wait?: boolean,
  error?: any | null
  initialized: boolean
}

interface IInstallationParams {
}

interface IInstanceParams {
  space: string
  accessToken: string
  contentType: string | null
  display: string | null
  value: string | null
}

interface IInvocationParams {
}

export class CrossSpaceLinkEditor extends Component<FieldExtensionSDK, IAppState> {
  private client: ContentfulClientApi
  private readonly errorHandler = new AsyncErrorHandler(this)

  constructor(props: FieldExtensionSDK, context?: any) {
    super(props, context)

    this.state = {
      value: null,
      wait: false,
      possibilities: [],
      visiblePossibilities: [],
      error: null,
      initialized: false,
    }

    this.componentDidMount = this.errorHandler.wrap(this, this.componentDidMount)
    this.loadPossibilities = this.errorHandler.wrap(this, this.loadPossibilities)
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

    this.client = createClient({
      accessToken: this.params().accessToken,
      space: this.params().space,
    })

    sdk.field.onValueChanged(this.onValueChanged)

    await this.loadPossibilities()

    // initialize visible state
    const value: string = sdk.field.getValue()
    this.onValueChanged(value)
    this.setState({ initialized: true })
  }

  public render() {
    const { value, visiblePossibilities, wait: loading, initialized, error } = this.state

    return <div className={`cross-space-link container-fluid ${error ? 'error' : ''}`}>
      <div className="row">
        {error && <div>
            <h1>Error!</h1>
            <pre>
              {error.message}
            </pre>
          </div>}
        <div className="col-sm-6">
          <input className="cf-form-input" disabled={initialized == false} value={value ? value.label : ''}
            list="possibilities" autocomplete="on"
            onInput={this.onKeyDown} />
        </div>
        <div className="col-sm-6">
          <div className="loader" style={{visibility: loading ? 'visible' : 'hidden'}} />
          <ul className="possibilities">
            {visiblePossibilities.map((v) =>
              <li className="possibilities__item" onClick={this.selectPossibility(v)}>
                {v.label}
              </li>,
            )}
          </ul>
        </div>
      </div>
      <datalist id="possibilities">
        {visiblePossibilities.map((v) => <option>{v.label}</option>)}
      </datalist>
    </div>
  }

  private update = async (value: IEntryValue | null) => {
    const sdk = this.props

    await sdk.field.setValue(value ? value.value : null)
    this.validate(value)
  }

  private validate = (value: IEntryValue | null) => {
    const sdk = this.props

    if (!value || !value.label || value.label.length == 0) {
      sdk.field.setInvalid(false)
      return
    }

    const hasValidEntry = !!value.entry
    sdk.field.setInvalid(!hasValidEntry)
  }

  private onKeyDown: JSX.EventHandler<KeyboardEvent> = (evt) => {
    const newLabel = typeof evt == 'string' ? evt : (evt.target as HTMLInputElement).value
    const { possibilities } = this.state

    if (!newLabel) {
      const newValue: IEntryValue = {
        entry: null,
        label: newLabel,
        value: newLabel,
      }
      this.update(newValue)
      this.setState({
        value: newValue,
        visiblePossibilities: [],
      })
      return
    }

    const toFind = newLabel.trim().toLowerCase()
    const found = possibilities.find((p) => p.label.trim().toLowerCase() == toFind)
    if (found) {
      this.update(found)
      this.setState({
        value: found,
        visiblePossibilities: [found],
      })
    } else {
      const newValue: IEntryValue = {
        entry: null,
        label: newLabel,
        value: newLabel,
      }
      this.update(newValue)
      this.setState({
        value: newValue,
        visiblePossibilities: possibilities.filter((p) => p.label.trim().toLowerCase().includes(toFind)),
      })
    }
  }

  private onValueChanged = (newValue: string) => {
    const { possibilities } = this.state

    if (possibilities.length == 0) {
      return
    }

    const found = possibilities.find((p) => p.value == newValue)
    if (found) {
      this.setState({
        value: found,
      })
      this.validate(found)
    } else {
      const value: IEntryValue = {
        entry: null,
        label: newValue,
        value: newValue,
      }
      this.setState({
        value,
      })
      this.validate(value)
    }
  }

  private loadPossibilities = async () => {
    const query = {
      content_type: this.params().contentType,
    }
    let entries = await this.client.getEntries<any>(query)

    const allPossibilities = entries.toPlainObject().items
    while (entries.items.length + entries.skip < entries.total) {
      // next page
      entries = await this.client.getEntries<any>({
        ...query,
        skip: entries.items.length + entries.skip,
      })
      allPossibilities.push(...entries.toPlainObject().items)
    }

    this.setState({
      possibilities: allPossibilities.map(this.toEntryValue),
    })
  }

  private selectPossibility = (value: IEntryValue) =>
    (evt: any) => {
      this.update(value)
      this.setState({
        value,
        visiblePossibilities: [value],
      })
    }

  private displayName(entry: Entry<any>, display: string | null = this.params().display): string {
    if (!display) {
      return entry.fields[Object.keys(entry.fields)[0]]
    }

    return getOrTemplate(entry, display)
  }

  private value(entry: Entry<any>, selector: string | null = this.params().value): string {
    if (!selector) {
      return entry.sys.id
    }

    return getOrTemplate(entry, selector)
  }

  private toEntryValue = (entry: Entry<any>): IEntryValue => {
    return {
      entry,
      label: this.displayName(entry),
      value: this.value(entry),
    }
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
})
