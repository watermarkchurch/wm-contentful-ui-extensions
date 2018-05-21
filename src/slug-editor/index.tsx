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
}

class App extends Component<IContentfulExtensionSdk, IAppState> {

  constructor() {
    super()
    this.onSlugChange = this.onSlugChange.bind(this)
  }

  public componentDidMount() {
    this.setState({
      fieldValue: this.props.field.getValue(),
    })

    // find the page pointing to this page
    const promise = this.props.space.getEntries({
      'content_type': 'page',
      'fields.subpages.sys.id': this.props.entry.getSys().id,
    }).then((entries) => {
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
    }).catch((err) => {
      console.error('Error querying!', err)
    })
  }

  public render() {
    const { fieldValue, parentSlug } = this.state

    console.log('render', parentSlug)

    return <div>
      <SlugForm slug={fieldValue}
        parentSlug={parentSlug}
        onChange={this.onSlugChange} />
    </div>
  }

  private onSlugChange(event: { oldValue: string, newValue: string }) {
    this.props.field.setValue(pathJoin(this.state.parentSlug, event.newValue))
  }
}
