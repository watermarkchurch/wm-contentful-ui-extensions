import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {IContentfulExtensionSdk, ILink} from 'contentful-ui-extensions-sdk'
import {Component, h, render} from 'preact'

import { pathJoin, trimStart } from '../lib/utils'
import {SlugForm} from './slug-form'

declare function require(module: string): any
const styles = require('./styles.scss')

if (contentfulExtension) {
  contentfulExtension.init((extension) => {
    render(<SlugEditor {...extension} />,
      document.getElementById('react-root'))
  })
}

interface IAppState {
  fieldValue: string
  parentSlug: string
  errors: string[]
  warnings: string[]
}

export class SlugEditor extends Component<IContentfulExtensionSdk, IAppState> {

  constructor() {
    super()
    this.onSlugChange = this.onSlugChange.bind(this)
  }

  public componentDidMount() {
    this.setState({
      fieldValue: this.props.field.getValue(),
      errors: [],
    })

    this.props.field.onValueChanged(async (newValue) => {
      this.setState({
        fieldValue: newValue,
      })
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
      await this.props.field.setValue(newValue)
    }
  }

  private async validateNewSlug(value: string): Promise<boolean> {
    const errors: string[] = []
    const warnings: string[] = []

    if (!value || value.length == 0) {
      errors.push(`The slug cannot be empty!`)
    } else if (/\s/.test(value)) {
      errors.push(`The slug must not contain whitespace!`)
    }

    const { fields } = this.props.entry
    if (fields.subpages) {
      const subpages = fields.subpages.getValue()
      if (subpages && subpages.length > 0) {

        warnings.push(...await this.checkSubpages(subpages))
      }
    }

    this.setState({
      errors,
      warnings,
    })

    if (errors.length > 0) {
      this.props.field.setInvalid(true)
      return false
    } else {
      this.props.field.setInvalid(false)
      return true
    }
  }

  private async checkSubpages(subpages: Array<ILink<'Entry'>>): Promise<string[]> {
    const {parentSlug, fieldValue} = this.state
    const { space, environment } = this.props.entry.getSys()

    const entries = await this.props.space.getEntries({
      'content_type': 'page',
      'sys.id[in]': subpages.map((link) => link.sys.id).join(','),
    })

    const warnings: string[] = entries.items.filter((i) => i).map((page) => {
      if (!page || !page.fields || !page.fields.slug || !page.fields.slug['en-US']) {
        return null
      }
      const slug = page.fields.slug['en-US'] as string
      if (slug.startsWith(pathJoin(parentSlug, fieldValue))) {
        console.log(`subpage ${slug} is good`)
        return null
      }

      console.log('bad page', fieldValue, page.fields)

      const title = page.fields.title && page.fields.title['en-US']
      return `<a href="https://app.contentful.com/spaces/${space.sys.id}` +
        `/entries/${page.sys.id}" target="_blank">${title || page.sys.id}</a> ` +
        `(${slug})`
    }).filter((w) => w)

    if (warnings.length == 0) {
      return warnings
    }

    return [
      `Be sure to update these subpages! Their slugs are wrong:<br/>  ` +
      warnings.join(',<br/>')]

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

    await this.validateNewSlug(fieldValue)
  }
}

function isGUID(str: string): boolean {
  // 74cf1363-def1-4596-8683-268af397eaa5
  return /^(\w+\-){4}\w+$/.test(str)
}
