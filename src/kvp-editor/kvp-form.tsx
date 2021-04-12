import * as $ from 'jquery'
import {Component, h, JSX, render} from 'preact'

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
    console.log('rerender', this.state.errors)

    return <div className="kvp-form">
        <div className="kvp-form__table">
          <table>
            <tbody>
              {items && items.map((item, index) =>
                  <tr key={index} className="kvp-form__table__row" data-testid="table-row">
                    <td className="text">{item.key}</td>
                    <td className="divider">|</td>
                    <td className="text">{item.value}</td>
                    <td className="buttons">
                      <div className="flex-vert">
                        <a className="" data-testid="move-up"
                            onClick={() => this.moveUp(index)}>
                          {index > 0 ? '△' : '\u00A0'}
                        </a>
                        <a className=""  data-testid="move-down"
                            onClick={() => this.moveDown(index)}>
                          {index < items.length - 1 ? '▽' : '\u00A0'}
                        </a>
                      </div>
                      <button className="cf-btn-secondary delete" data-testid="delete"
                        onClick={() => this.deleteRow(item)}>X</button>
                    </td>
                  </tr>,
                )}
                <tr className="kvp-form__table__row form" data-testid="form-row">
                  <td className="text">
                  <input className="cf-form-input" type="text" id="key" data-testid="key"
                    onChange={this.setKey} value={this.state.key}></input>
                  </td>
                  <td className="divider">
                  <span class="divider">|</span>
                  </td>
                  <td className="text">
                  <input className="cf-form-input" type="text" id="value" data-testid="value"
                    onChange={this.setVal} value={this.state.value}></input>
                  </td>
                  <td className="buttons">
                  <button className="cf-btn-primary" type="submit" id="add" data-testid="add"
                    onClick={this.addRow}>+</button>
                  </td>
                </tr>
            </tbody>
          </table>

          {this.state.errors && this.state.errors.map((e) =>
            <div class="error" data-testid="error">{e}</div>,
          )}
        </div>
      </div>
  }

  private setKey: JSX.GenericEventHandler<HTMLInputElement> = (evt) => {
    const newKey = typeof evt == 'string' ? evt : (evt.target as HTMLInputElement).value
    this.setState({
      key: newKey,
    })
  }
  private setVal: JSX.GenericEventHandler<HTMLInputElement> = (evt) => {
    const newVal = typeof evt == 'string' ? evt : (evt.target as HTMLInputElement).value
    this.setState({
      value: newVal,
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

      this.props.onItemsChanged([...items, value])
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
    console.log('deleteRow')
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
