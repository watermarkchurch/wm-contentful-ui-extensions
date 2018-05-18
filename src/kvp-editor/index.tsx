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

  render() {
    const { fieldValue, parentSlug } = this.state

    return <div>
      <h2>KVP Editor</h2>
    </div>
  }
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