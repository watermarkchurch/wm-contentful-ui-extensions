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
    this.loadLink = this.errorHandler.wrap(this, this.loadLink)
    this.loadPossibilities = this.errorHandler.wrap(this, this.loadPossibilities)
    this.clearValue = this.errorHandler.wrap(this, this.clearValue)
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

    sdk.field.onValueChanged((newValue) => {
      this.loadLink(newValue)
    })

    await Promise.all([
      this.loadLink(sdk.field && sdk.field.getValue()),
      this.loadPossibilities(),
    ])

    // initialize visible state
    this.validate()
    this.setState({ initialized: true })
  }

  public render() {
    const { value, visiblePossibilities, wait: loading, initialized, error } = this.state

    return <div className={`cross-space-link ${error ? 'error' : ''} ${loading ? 'loading disabled' : ''}`}>
      {error && <div>
          <h1>Error!</h1>
          <pre>
            {error.message}
          </pre>
        </div>}
        <div className="">
          <input className="cf-form-input" disabled={initialized == false} value={value ? value.label : ''}
            list="possibilities" autocomplete="on"
            onChange={this.onChange} onInput={this.onKeyDown} />
        </div>
      <div className="loader" style={{visibility: loading ? 'visible' : 'hidden'}} />
      <ul>
        {visiblePossibilities.map((v) => {
          return <li>
            <a onClick={this.selectPossibility(v)}>
              {v.label}
            </a>
          </li>
        })}
      </ul>
      <datalist id="possibilities">
        {visiblePossibilities.map((v) => <option>{v.label}</option>)}
      </datalist>
    </div>
  }

  private onChange: JSX.EventHandler<Event> = () => {
    this.validate()
  }

  private validate = () => {
    const sdk = this.props

    const { value } = this.state
    sdk.field.setValue(value.value)

    if (!value || value.label.length == 0) {
      sdk.field.setInvalid(false)
      return
    }

    const hasValidEntry = !!this.state.value.entry
    sdk.field.setInvalid(!hasValidEntry)
  }

  private onKeyDown: JSX.EventHandler<KeyboardEvent> = (evt) => {
    const newLabel = typeof evt == 'string' ? evt : (evt.target as HTMLInputElement).value
    const { possibilities } = this.state

    if (!newLabel) {
      this.setState({
        value: {
          entry: null,
          label: newLabel,
          value: newLabel,
        },
        visiblePossibilities: [],
      })
      return
    }

    const toFind = newLabel.trim().toLowerCase()
    const found = possibilities.find((p) => p.label.trim().toLowerCase() == toFind)

    if (found) {
      this.selectPossibility(found)
    } else {
      this.setState({
        value: {
          entry: null,
          label: newLabel,
          value: newLabel,
        },
        visiblePossibilities: possibilities.filter((p) => p.label.trim().toLowerCase().startsWith(toFind)),
      })
    }
  }

  private loadLink = async (fieldValue: string | null) => {
    const params = this.params()

    if (!(fieldValue)) {
      this.setState({
        value: null,
      })
      return
    }

    const query: { [prop: string]: string } = {}
    if (params.value) {
      if (!params.contentType) {
        throw new Error(`Cannot search for entry by value '${params.value}' without setting contentType parameter`)
      }
      query.content_type = params.contentType

      if (/^sys/.test(params.value) || /^fields/.test(params.value)) {
        query[params.value] = fieldValue
      } else {
        query['fields.' + params.value] = fieldValue
      }
    } else {
      query['sys.id'] = fieldValue
    }
    const entries = await this.client.getEntries(query)
    const entry = entries.items[0]

    this.setState({
      value: {
        value: fieldValue,
        label: entry ? this.displayName(entry) : fieldValue,
        entry,
      },
    })
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
    this.errorHandler.wrap(this, async (evt?: any) => {
      const sdk = this.props
      this.setState({
        value,
        visiblePossibilities: [value],
      })
      await sdk.field.setValue(value.value)
    })

  private clearValue = async (evt: any) => {
    const sdk = this.props

    await sdk.field.removeValue()
    this.setState({
      value: null,
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
