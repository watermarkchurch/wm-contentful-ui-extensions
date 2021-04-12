import type {} from 'bootstrap'
import {ContentfulClientApi} from 'contentful'
import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {FieldExtensionSDK} from 'contentful-ui-extensions-sdk'
import {Component, h, render} from 'preact'

import { AsyncErrorHandler } from '../lib/async-error-handler'
import { injectBootstrap } from '../lib/utils'

declare function require(module: string): any
const styles = require('./style.scss')

if (contentfulExtension) {
  contentfulExtension.init((extension: FieldExtensionSDK) => {
    render(<${name_titleized} {...extension} />,
      document.getElementById('react-root'))
    extension.window.startAutoResizer()
  })
}

interface IAppState {
  fieldValue: IFieldValue | null,

  loading: boolean,
  error: any | null
}

type IFieldValue = string

// tslint:disable no-empty-interface
interface IInstallationParams {
}

interface IInstanceParams {
}

interface IInvocationParams {
}
// tslint:enable no-empty-interface

export class $ {name_titleized} extends Component < FieldExtensionSDK, IAppState > {
  private client: ContentfulClientApi
  private readonly errorHandler = new AsyncErrorHandler(this)

  constructor(props: FieldExtensionSDK, context?: any) {
    super(props, context)

    this.state = {
      fieldValue: null,
      loading: false,
      error: null,
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

    this.setState({
      fieldValue: sdk.field && sdk.field.getValue(),
    })

    sdk.field.onValueChanged((newValue) => {
      this.setState({
        fieldValue: newValue,
      })
    })
  }

  public render() {
    const {  loading, error } = this.state
    const params = this.params()

    return <div className={['${name_dasherized}', error && 'error', loading && 'loading disabled'].join(' ')}>
      {loading && <div class="loader"></div>}
      {error && <div>
          <h1>Error!</h1>
          <pre>
            {error.message}
          </pre>
        </div>}
    </div>
  }
}

JQuery(document).ready(() => {
  injectBootstrap()
})
