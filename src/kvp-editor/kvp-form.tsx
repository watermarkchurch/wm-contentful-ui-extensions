import {Component, h, render} from 'preact'

interface IPair { key: string, value: string }

interface IProps {
  items?: IPair[]
}

export class KVPForm extends Component<IProps, {}> {
  public render() {
    const {items} = this.props

    return <div>
        <div className="kvp-form__header">Enter tags as key-value pairs</div>
        <div className="kvp-form__form">
          <form>
            <input type="text" name="key" id="key"></input>
            <input type="text" name="value" id="value"></input>
          </form>
        </div>
        <div className="kvp-form__table">
          <table>
            <tbody>
              {items && items.map((item) =>
                  <tr className="kvp-form__table__row">
                    <td><button>X</button></td>
                    <td>{item.key}</td>
                    <td>{item.value}</td>
                  </tr>,
                )}
            </tbody>
          </table>
        </div>
      </div>
  }
}
