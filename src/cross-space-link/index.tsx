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
    render(<CrossSpaceLinkEditor {...extension} />,
      document.getElementById('react-root'))
    extension.window.startAutoResizer()
  })
}

interface IAppState {
  fieldValue: IFieldValue | null,
  link: Entry<any> | null,
  possibilities: Array<Entry<any>>,
  wait: boolean,
  error: any | null
}

type IFieldValue = string

interface IInstanceParams {
  space: string
  accessToken: string
  contentType: string | null
  display: string | null
  value: string | null
}

export class CrossSpaceLinkEditor extends Component<FieldExtensionSDK, IAppState> {
  private client: ContentfulClientApi
  private readonly errorHandler = new AsyncErrorHandler(this)

  constructor(props: FieldExtensionSDK, context?: any) {
    super(props, context)

    this.state = {
      fieldValue: null,
      link: null,
      wait: false,
      possibilities: [],
      error: null,
    }

    this.loadLink = this.errorHandler.wrap(this, this.loadLink)
    this.loadPossibilities = this.errorHandler.wrap(this, this.loadPossibilities)
    this.removeLink = this.errorHandler.wrap(this, this.removeLink)
  }

  public params(): IInstanceParams {
    const params: any = (this.props.parameters && this.props.parameters.instance) || {}
    return params
  }

  public componentDidMount() {
    const sdk = this.props

    this.setState({
      fieldValue: sdk.field && sdk.field.getValue(),
    })

    this.client = createClient({
      accessToken: this.params().accessToken,
      space: this.params().space,
    })

    sdk.field.onValueChanged((newValue) => {
      this.setState({
        fieldValue: newValue,
        link: null,
      })

      this.loadLink()
    })

    this.loadLink()
    this.loadPossibilities()
  }

  public render() {
    const { link, fieldValue, wait: loading, error } = this.state
    const params = this.params()

    return <div className={`cross-space-link ${error ? 'error' : ''} ${loading ? 'loading disabled' : ''}`}>
      {loading && <div class="loader"></div>}
      {error && <div>
          <h1>Error!</h1>
          <pre>
            {error.message}
          </pre>
        </div>}
      {link ?
        this.renderLink() :
        <div>
          {fieldValue && !loading && !error &&
            <h4 className="error">Broken link!</h4>}
          <a data-toggle="modal" data-target="#exampleModal">
            Link existing entries
          </a>
        </div>}
      <div className="modal" id="exampleModal"
          tabIndex={-1} role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose an entry</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul>
                {this.state.possibilities.map((entry) => {
                  return <li>
                    <a onClick={this.selectLink(entry)}>
                      {this.displayName(entry, params.display)}
                    </a>
                  </li>
                })}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  private renderLink = () => {
    const { link } = this.state

    return <div>
      {this.displayName(link, this.params().display)}
      <a onClick={this.removeLink} className="btn btn-danger">
        Delete
      </a>
    </div>
  }

  private loadLink = async () => {
    const { fieldValue } = this.state
    const params = this.params()

    if (!(fieldValue)) {
      this.setState({
        fieldValue: null,
        link: null,
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

    this.setState({
      link: entries.items[0],
    })
  }

  private loadPossibilities = async () => {
    const entries = await this.client.getEntries<any>({
      content_type: this.params().contentType,
    })

    this.setState({
      possibilities: entries.toPlainObject().items,
    })
  }

  private selectLink = (entry: Entry<any>) =>
    this.errorHandler.wrap(this, async (evt: any) => {
      const sdk = this.props
      const newValue: IFieldValue = this.value(entry, this.params().value)

      await sdk.field.setValue(newValue)
      this.setState({
        fieldValue: newValue,
      })

      requestAnimationFrame(() =>
        $('#exampleModal').modal('hide'),
      )
    })

  private removeLink = async (evt: any) => {
    const sdk = this.props

    await sdk.field.removeValue()
    this.setState({
      fieldValue: null,
      link: null,
    })
  }

  private displayName(entry: Entry<any>, display: string | null): string {
    if (!display) {
      return entry.fields[Object.keys(entry.fields)[0]]
    }

    return getOrTemplate(entry, display)
  }

  private value(entry: Entry<any>, selector: string | null): IFieldValue {
    if (!selector) {
      return entry.sys.id
    }

    return getOrTemplate(entry, selector)
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
