import {ContentfulClientApi, createClient, Entry, Field} from 'contentful'
import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {FieldExtensionSDK} from 'contentful-ui-extensions-sdk'
import {Component, h, render} from 'preact'
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
  fieldValue: {
    sys: {
      id: string,
      type: 'Link',
      linkType: 'Entry',
      space?: {
        sys: {
          id: string,
          type: 'Link',
          linkType: 'Space',
        },
      },
    },
  } | null,
  link: Entry<any> | null,
  possibilities: Array<Entry<any>>,
  loading: boolean,
  error: any | null
}

interface IInstanceParams {
  space: string
  accessToken: string
  contentType: string
  display: string
}

export class CrossSpaceLinkEditor extends Component<FieldExtensionSDK, IAppState> {
  private client: ContentfulClientApi

  constructor(props: FieldExtensionSDK, context?: any) {
    super(props, context)

    this.state = {
      fieldValue: null,
      link: null,
      loading: false,
      possibilities: [],
      error: null,
    }
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
      })

      this.loadLink()
    })

    this.loadLink()
    this.loadPossibilities()
  }

  public render() {
    const { link, fieldValue, loading } = this.state
    const params = this.params()

    return <div className={`cross-space-link ${loading ? 'disabled' : ''}`}>
      {link ?
        this.renderLink() :
        <div>
          {fieldValue ?
            <h4 className="error">Broken link!</h4> :
            <span></span>}
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
                  const fieldNames = Object.keys(entry.fields)
                  let display: string
                  if (!params.display) {
                    display = entry.fields[fieldNames[0]]
                  } else if (fieldNames.indexOf(params.display) >= 0) {
                    display = entry.fields[params.display]
                  } else {
                    display = template(params.display, {
                      ...entry.sys,
                      ...entry.fields,
                    })
                  }

                  return <li>
                    {display}
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
      {link.sys.id}
    </div>
  }

  private loadLink = async () => {
    const { fieldValue } = this.state
    if (!(fieldValue && fieldValue.sys && fieldValue.sys.id)) {
      this.setState({
        fieldValue: null,
        link: null,
      })
      return
    }

    try {
      this.setState({ loading: true, error: null })

      const entry = await this.client.getEntry(fieldValue.sys.id)

      this.setState({
        link: entry,
      })
    } catch (ex) {
      this.setState({ error: ex })
    } finally {
      this.setState({ loading: false })
    }
  }

  private loadPossibilities = async () => {
    try {
      const entries = await this.client.getEntries<any>({
        content_type: this.params().contentType,
      })

      this.setState({
        possibilities: entries.toPlainObject().items,
      })
    } catch (ex) {
      this.setState({ error: ex })
    }
  }
}

$(document).ready(() => {
  injectBootstrap()
})
