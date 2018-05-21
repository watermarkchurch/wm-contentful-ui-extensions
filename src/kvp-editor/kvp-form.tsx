import * as $ from 'jquery'
import {Component, h, render} from 'preact'

export interface IPair { key: string, value: string }

interface IProps {
  items?: IPair[]
  onItemsChanged?: (evt: IPair[]) => any
}

interface IState {
  key?: string
  value?: string,
  errors?: string[]
}

export class KVPForm extends Component<IProps, IState> {
  constructor() {
    super()
    this.setKey = this.setKey.bind(this)
    this.setVal = this.setVal.bind(this)
    this.addRow = this.addRow.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
  }

  public render() {
    const {items} = this.props

    return <div className="kvp-form">
        <div className="kvp-form__form">
          <form >
            <input className="cf-form-input" type="text" id="key"
              onChange={this.setKey} value={this.state.key}></input>
            <span class="divider">|</span>
            <input className="cf-form-input" type="text" id="value"
              onChange={this.setVal} value={this.state.value}></input>
            <button className="cf-btn-primary" type="submit" id="add" onClick={this.addRow}>+</button>
            {this.state.errors && this.state.errors.map((e) =>
              <div class="error">{e}</div>,
            )}
          </form>
        </div>
        <div className="kvp-form__table">
          <table>
            <tbody>
              {items && items.map((item, index) =>
                  <tr key={index} className="kvp-form__table__row">
                    <td className="text">{item.key}</td>
                    <td class="divider">|</td>
                    <td className="text">{item.value}</td>
                    <td className="buttons">
                      <div className="flex-vert">
                        <a className="" onClick={() => this.moveUp(index)}>{index > 0 ? '△' : '\u00A0'}</a>
                        <a className="" onClick={() => this.moveDown(index)}>
                          {index < items.length - 1 ? '▽' : '\u00A0'}
                        </a>
                      </div>
                      <button className="cf-btn-secondary delete" onClick={() => this.deleteRow(item)}>X</button>
                    </td>
                  </tr>,
                )}
            </tbody>
          </table>
        </div>
      </div>
  }

  private setKey(evt: Event) {
    this.setState({
      key: $(evt.target).val().toString(),
    })
  }
  private setVal(evt: Event) {
    this.setState({
      value: $(evt.target).val().toString(),
    })
  }

  private addRow() {
    const errors = []
    if (!this.state.key || this.state.key.length == 0) {
      errors.push(`Please set a key`)
    }
    if (!this.state.value || this.state.value.length == 0) {
      errors.push(`Please set a value`)
    }
    if (errors.length == 0 && this.props.onItemsChanged) {
      const value = { key: this.state.key, value: this.state.value }
      const items = this.props.items || []

      this.props.onItemsChanged([value, ...items])
      this.setState({
        key: '',
        value: '',
      })
    }
    this.setState({
      errors,
    })
  }

  private deleteRow(item: IPair) {
    this.setState({
      key: item.key,
      value: item.value,
    })

    if (!this.props.onItemsChanged) {
      return
    }

    const items = this.props.items || []
    if (items.length == 0) {
      return
    }
    const i = items.findIndex((p) => p.key == item.key && p.value == item.value)

    if (i < 0) {
      return
    }

    const value = items.slice(0, i)
    value.push(...items.slice(i + 1))
    this.props.onItemsChanged(value)
  }

  private moveUp(index: number) {
    const items = this.props.items || []
    if (items.length > 0 && index > 0 && this.props.onItemsChanged) {
      const item = items.splice(index, 1)
      items.splice(index - 1, 0, ...item)
      this.props.onItemsChanged(items)
    }
  }

  private moveDown(index: number) {
    const items = this.props.items || []
    if (items.length > 0 && index < items.length - 1 && this.props.onItemsChanged) {
      const item = items.splice(index, 1)
      items.splice(index + 1, 0, ...item)
      this.props.onItemsChanged(items)
    }
  }
}
