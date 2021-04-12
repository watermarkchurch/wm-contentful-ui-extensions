import {Component, h} from 'preact'

export interface ISlugFormProps {
  slug: string
  parentSlug: string

  onChange?: (this: SlugForm, event: { oldValue: string, newValue: string }) => void
}

export class SlugForm extends Component<ISlugFormProps, {value: string}> {

  constructor() {
    super()

    this.onFocusGained = this.onFocusGained.bind(this)
    this.onFocusLost = this.onFocusLost.bind(this)
    this.demandFocus = this.demandFocus.bind(this)
  }

  public componentDidMount() {
    this.setState({
      value: this.props.slug,
    })
  }

  public render() {
    const {parentSlug} = this.props
    let {slug} = this.props
    if (this.state && this.state.value && this.state.value.length > 0) {
      slug = this.state.value
    }

    return (
      <div id="slugForm" class="cf-form-input" onClick={this.demandFocus}>
        { parentSlug &&
          <span id="parent" data-testid="parent" title="This comes from the parent page and you can't change it here.">
            {parentSlug}/
          </span>
        }
        <span id="slug" data-testid="slug" contentEditable onFocus={this.onFocusGained} onBlur={this.onFocusLost}>
          {slug}
        </span>
      </div>
    )
  }

  private demandFocus() {
    $('#slugForm #slug').focus()
  }

  private onFocusLost(evt: any) {
    const newText = evt.target.textContent
    const oldValue = this.state.value
    if (newText != oldValue) {
      this.setState({ value: newText })

      this.props.onChange.call(this, {
        oldValue,
        newValue: newText,
      })
    }
  }

  private onFocusGained(evt: any) {
    console.log('focusGained', evt)
  }
}
