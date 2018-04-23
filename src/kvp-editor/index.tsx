import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {IContentfulExtensionSdk} from 'contentful-ui-extensions-sdk'
import {h, render, Component} from 'preact'

declare function require(module: string): any;
const styles = require('./style.scss')

contentfulExtension.init((extension) => {
  render(<App {...extension} />,
    document.getElementById('react-root'))
})

interface IAppState {
  fieldValue: string
  parentSlug: string
}

class App extends Component<IContentfulExtensionSdk, IAppState> {

  onSlugChange(event: { oldValue: string, newValue: string }) {
    this.props.field.setValue(pathJoin(this.state.parentSlug, event.newValue))
  } 

  componentDidMount() {
    this.setState({
      fieldValue: this.props.field.getValue()
    })

    // find the page pointing to this page
    const promise = this.props.space.getEntries({
      content_type: 'page',
      'fields.subpages.sys.id': this.props.entry.getSys().id
    }).then((entries) => {
      if (entries.items.length <= 0) {
        return
      }

      const parentSlug = entries.items[0].fields.slug['en-US']
      let fieldValue = this.state.fieldValue
      fieldValue = trimStart(fieldValue, parentSlug)
      fieldValue = trimStart(fieldValue, '/')

      this.setState({
        parentSlug: parentSlug,
        fieldValue
      })
    }).catch(err => {
      console.error('Error querying!', err)
    })
  }

  render() {
    const { fieldValue, parentSlug } = this.state

    return <div>
    </div>
  }
}

function pathJoin(...pathArr: string[]){
  return pathArr.join("/").replace(/\/{2,}/, '/');
}

function basename(path: string): string {
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1]
}

function trimStart(toTrim: string, valueToRemove: string): string {
  while (toTrim.startsWith(valueToRemove)) {
    toTrim = toTrim.substring(valueToRemove.length)
  }
  return toTrim
}

// polyfills
declare global {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  interface String {
    startsWith(search: string, pos?: number): boolean
  }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}