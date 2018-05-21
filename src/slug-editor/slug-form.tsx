import { ICurrentField } from 'contentful-ui-extensions-sdk'
import {Component, h} from 'preact'

export interface ISlugFormProps {
  slug: string
  parentSlug: string

  onChange(this: SlugForm, event: { oldValue: string, newValue: string }): void
}

export class SlugForm extends Component<ISlugFormProps, {value: string}> {

  public componentDidMount() {
    this.setState({
      value: this.props.slug,
    })
  }

  public render() {
    const {slug, parentSlug} = this.props

    return (
      <div id="slugForm" class="cf-form-input">
        { parentSlug && <span id="parent">{parentSlug}/</span>}
        <span id="slug" contentEditable onFocus={this.onFocusGained.bind(this)} onBlur={this.onFocusLost.bind(this)}>
          {slug}
        </span>
      </div>
    )
  }

  private onFocusLost(evt: any) {
    const newText = evt.target.textContent
    if (newText != this.state.value) {
      this.setState({ value: newText })
      this.props.onChange.call(this, {
        oldValue: this.state.value,
        newValue: newText,
      })
    }
  }

  private onFocusGained(evt: any) {
    console.log('focusGained', evt)
  }
}
