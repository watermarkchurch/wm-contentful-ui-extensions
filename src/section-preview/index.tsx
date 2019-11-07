import {} from 'bootstrap'
import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {FieldExtensionSDK} from 'contentful-ui-extensions-sdk'
import * as JQuery from 'jquery'
import debounce from 'lodash-es/debounce'
import {Component, h, render} from 'preact'

import { injectBootstrap } from '../lib/utils'
const template = require('es6-dynamic-template')

declare function require(module: string): any
const styles = require('./style.scss')

if (contentfulExtension) {
  contentfulExtension.init((extension: FieldExtensionSDK) => {
    render(<SectionPreview {...extension} />,
      document.getElementById('react-root'))
    extension.window.startAutoResizer()
  })
}

interface IAppState {
  fieldValue: IFieldValue | null,
  entry: contentfulExtension.EntryAPI

  fields: {
    [fieldName: string]: any,
  }

  clearUrl?: boolean
  loading?: boolean
}

type IFieldValue = string

interface IInstallationParams {
}

interface IInstanceParams {
  renderUrl: string
}

interface IInvocationParams {
}

export class SectionPreview extends Component<FieldExtensionSDK, IAppState> {

  constructor(sdk: FieldExtensionSDK, context?: any) {
    super(sdk, context)

    this.state = {
      fieldValue: sdk.field && sdk.field.getValue(),
      entry: sdk.entry,
      fields: Object.keys(sdk.entry.fields)
        .reduce((fields, fieldName) => {
          fields[fieldName] = sdk.entry.fields[fieldName].getValue()
          return fields
        }, {} as any),
      loading: true,
    }
  }

  public params(): IInstallationParams & IInstanceParams & IInvocationParams {
    const params: contentfulExtension.ParametersAPI = this.props.parameters || ({} as any)
    return Object.assign({},
      params.installation,
      params.instance,
      params.invocation) as any
  }

  public componentDidMount() {
    const sdk = this.props

    sdk.field.onValueChanged((newValue) => {
      this.setState({
        fieldValue: newValue,
      })
      this.reload()
    })

    Object.keys(sdk.entry.fields)
      .forEach((fieldName) => {
        const onValueChanged = (newValue: any) => {
          const fields = {
            ...this.state.fields,
          }
          fields[fieldName] = newValue
          this.setState({fields})
          this.reload()
        }
        sdk.entry.fields[fieldName].onValueChanged(onValueChanged as any, undefined)
      })
  }

  public renderUrl() {
    const {entry, fields} = this.state

    const templateParams = {
        // allow `${sys.space.sys.id} and ${fields.name}`
      ...{ sys: entry.getSys(), fields },
        // allow `${id}` as shorthand
      id: (entry.getSys() as any).id,
        // allow `${name}` as shorthand`
      ...fields,
    }

    try {
      return template(this.params().renderUrl, templateParams)
    } catch (ex) {
      console.error('template error!', ex)
    }
  }

  public render() {
    const {loading, clearUrl} = this.state
    if (clearUrl) {
      setTimeout(() => { this.setState({loading: true, clearUrl: false})}, 1)
    }

    return <div className={['section-preview'].join(' ')}>
      <div className="d-flex align-items-end">
        <a className="badge badge-success" onClick={this.reload}><i className="material-icons">refresh</i></a>
        <div className="loader" style={{ visibility: loading ? 'visible' : 'hidden' }}></div>
      </div>
      <iframe src={clearUrl ? '' : this.renderUrl()}
        sandbox="allow-scripts"
        onLoad={(evt) => this.onLoad(evt)}>
      </iframe>
    </div>
  }

  // tslint:disable-next-line: member-ordering
  private reload = debounce(() => {
    this.setState({ clearUrl: true })
  }, 1000)

  private onLoad: JSX.EventHandler<Event> = (evt) => {
    this.setState({ loading: false })
  }
}

JQuery(document).ready(() => {
  injectBootstrap()
})
