import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {IContentfulExtensionSdk} from 'contentful-ui-extensions-sdk'
import {Component, h, render} from 'preact'

declare function require(module: string): any
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

  public render() {
    const { fieldValue, parentSlug } = this.state

    return <div>
      <h2>KVP Editor</h2>
    </div>
  }
}
