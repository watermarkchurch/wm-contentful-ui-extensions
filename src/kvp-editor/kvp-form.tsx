import * as $ from 'jquery'
import {Component, h, render} from 'preact'

export interface IPair { key: string, value: string }

interface IProps {
  items?: IPair[]
  onRowAdded?: (evt: IPair) => any
  onRowDeleted?: (evt: IPair) => any
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
              {items && items.map((item) =>
                  <tr className="kvp-form__table__row">
                    <td className="text">{item.key}</td>
                    <td class="divider">|</td>
                    <td className="text">{item.value}</td>
                    <td><button className="cf-btn-secondary delete" onClick={() => this.deleteRow(item)}>X</button></td>
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
    if (errors.length == 0 && this.props.onRowAdded) {
      if (this.props.onRowAdded) {
        this.props.onRowAdded({ key: this.state.key, value: this.state.value })
      }
    }
    this.setState({
      errors,
    })
  }

  private deleteRow(item: IPair) {
    if (this.props.onRowDeleted) {
      this.props.onRowDeleted(item)
    }
    this.setState({
      key: item.key,
      value: item.value,
    })
  }
}
