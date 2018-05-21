import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {IContentfulExtensionSdk} from 'contentful-ui-extensions-sdk'
import {Component, h, render} from 'preact'

import { pathJoin, trimStart } from '../lib/utils'
import {SlugForm} from './slug-form'

declare function require(module: string): any
const styles = require('./styles.scss')

contentfulExtension.init((extension) => {
  console.log('Init!')
  render(<App {...extension} />,
    document.getElementById('react-root'))
})

interface IAppState {
  fieldValue: string
  parentSlug: string
  errors: string[]
  warnings: string[]
}

class App extends Component<IContentfulExtensionSdk, IAppState> {

  constructor() {
    super()
    this.onSlugChange = this.onSlugChange.bind(this)
  }

  public componentDidMount() {
    this.setState({
      fieldValue: this.props.field.getValue(),
      errors: [],
    })

    this.onMount().catch((err) => {
      console.error('Error querying!', err)
      this.setState({
        errors: [err.toString()],
      })
    })
  }

  public render() {
    const { fieldValue, parentSlug, errors, warnings } = this.state

    return <div>
      <SlugForm slug={fieldValue}
        parentSlug={parentSlug}
        onChange={this.onSlugChange} />

      {errors && <div className="errors">
        {errors.map((err) =>
          <div className="error">{err}</div>,
        )}
        </div>}
      {warnings && <div className="warnings">
        {warnings.map((w) =>
          <div className="error" dangerouslySetInnerHTML={{__html: w}}></div>,
        )}
        </div>}
    </div>
  }

  private async onSlugChange(event: { oldValue: string, newValue: string }) {
    const newValue = pathJoin(this.state.parentSlug, event.newValue)

    this.setState({
      fieldValue: event.newValue,
    })
    if (await this.validateNewSlug(event.newValue)) {
      this.props.field.setInvalid(false)
      await this.props.field.setValue(newValue)
    } else {
      this.props.field.setInvalid(true)
    }
  }

  private async validateNewSlug(value: string): Promise<boolean> {
    const errors: string[] = []
    const warnings: string[] = []

    if (!value || value.length == 0) {
      errors.push(`The slug cannot be empty!`)
    }

    const { fields } = this.props.entry
    if (fields.subpages) {
      const subpages = fields.subpages.getValue()
      if (subpages && subpages.length > 0) {

        const { space, environment } = this.props.entry.getSys()
        const env = environment ? `/environments/${environment.sys.id}` : ''
        warnings.push(`Be sure to update these other pages too! Their slugs are going to be wrong:\n  ` +
          subpages.map((link: any) =>
            `<a href="https://app.contentful.com/spaces/${space.sys.id}${env}` +
              `/entries/${link.sys.id}">${link.sys.id}</a>`)
            .join(', <br/>'),
        )
      }
    }

    this.setState({
      errors,
      warnings,
    })

    return errors.length == 0
  }

  private async onMount(): Promise<void> {
    // find the page pointing to this page
    const entries = await this.props.space.getEntries({
      'content_type': 'page',
      'fields.subpages.sys.id': this.props.entry.getSys().id,
    })

    if (entries.items.length <= 0) {
      return
    }

    const parentSlug = entries.items[0].fields.slug['en-US']
    let fieldValue = this.state.fieldValue
    fieldValue = trimStart(fieldValue, parentSlug)
    fieldValue = trimStart(fieldValue, '/')

    this.setState({
      parentSlug,
      fieldValue,
    })

    if (!await this.validateNewSlug(fieldValue)) {
      this.props.field.setInvalid(true)
    } else {
      this.props.field.setInvalid(false)
    }
  }
}
