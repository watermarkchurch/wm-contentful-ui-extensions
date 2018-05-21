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
    this.onRowAdded = this.onRowAdded.bind(this)
    this.onRowDeleted = this.onRowDeleted.bind(this)
  }

  public componentDidMount() {
    const sdk = this.props
    this.setState({
      fieldValue: sdk.field.getValue() || [],
    })

    sdk.field.onValueChanged((newValue) => {
      this.setState({
        fieldValue: newValue,
      })
    })
  }

  public render() {
    const { fieldValue} = this.state

    return <div>
      <h2>KVP Editor</h2>
      <KVPForm
        items={fieldValue}
        onRowAdded={this.onRowAdded}
        onRowDeleted={this.onRowDeleted}
      />
    </div>
  }

  private async onRowAdded(pair: IPair) {
    const sdk = this.props
    const value = [pair, ...this.state.fieldValue]

    await sdk.field.setValue(value)
    this.setState({
      fieldValue: value,
    })
  }

  private async onRowDeleted(pair: IPair) {
    const sdk = this.props

    if (!this.state || !this.state.fieldValue || this.state.fieldValue.length == 0) {
      return
    }
    const {fieldValue} = this.state
    const i = fieldValue.findIndex((p) => p.key == pair.key && p.value == pair.value)

    if (i < 0) {
      return
    }

    const value = fieldValue.slice(0, i)
    value.push(...fieldValue.slice(i + 1))

    await sdk.field.setValue(value)
    this.setState({
      fieldValue: value,
    })
  }
}
