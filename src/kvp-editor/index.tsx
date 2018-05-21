import * as contentfulExtension from 'contentful-ui-extensions-sdk'
import {IContentfulExtensionSdk} from 'contentful-ui-extensions-sdk'
import {Component, h, render} from 'preact'
import { IPair, KVPForm } from './kvp-form'

declare function require(module: string): any
const styles = require('./style.scss')

if (contentfulExtension) {
  contentfulExtension.init((extension) => {
    render(<KvpEditor {...extension} />,
      document.getElementById('react-root'))
  })
}

interface IAppState {
  fieldValue?: KvpList
}

type KvpList = Array<{ key: string, value: string}>

export class KvpEditor extends Component<IContentfulExtensionSdk, IAppState> {

  constructor() {
    super()
    this.onItemsChanged = this.onItemsChanged.bind(this)
  }

  public componentDidMount() {
    const sdk = this.props
    this.setState({
      fieldValue: (sdk.field.getValue() || []).filter((i: any) => i),
    })

    sdk.field.onValueChanged((newValue) => {
      this.setState({
        fieldValue: (newValue || []).filter((i: any) => i),
      })
    })
  }

  public render() {
    const { fieldValue} = this.state

    return <div>
      <KVPForm
        items={fieldValue}
        onItemsChanged={this.onItemsChanged}
      />
    </div>
  }

  private async onItemsChanged(newItems: IPair[]) {
    const sdk = this.props

    await sdk.field.setValue(newItems)
    this.setState({
      fieldValue: newItems,
    })
  }
}
