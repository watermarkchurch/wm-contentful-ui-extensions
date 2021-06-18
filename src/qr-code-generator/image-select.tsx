import {Component, createRef, h, JSX, RefObject, render} from 'preact'

interface IProps {
  selected?: string
  onSelected: (logo?: string | null) => void
}

// tslint:disable: max-line-length
const Options = [
  { title: 'WM logo', url: 'data:image/svg+xml;charset=UTF-8,%3c?xml version=\'1.0\' encoding=\'UTF-8\'?%3e%3csvg id=\'Layer_1\' data-name=\'Layer 1\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 119.2 119.2\'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%23009dba;%7d%3c/style%3e%3c/defs%3e%3ctitle%3eArtboard 1%3c/title%3e%3cpath class=\'cls-1\' d=\'M84.9,0H34.4A34.4,34.4,0,0,0,0,34.4V84.9a34.46,34.46,0,0,0,34.4,34.4H84.9a34.46,34.46,0,0,0,34.4-34.4V34.4A34.53,34.53,0,0,0,84.9,0ZM34.4,9.5H84.9a24.8,24.8,0,0,1,24.8,24.8V52.5c-9.3,7.8-18.8,8.9-28.9,7.5l5.3-20a4.75,4.75,0,0,0-9.2-2.4s-2.7,10-5.5,20.6c-.7-.2-1.3-.3-2-.5l-5-20a4.72,4.72,0,0,0-4.6-3.6h0a4.72,4.72,0,0,0-4.6,3.6S53.5,44.6,51.4,53c-1.7-.4-3.4-.7-5.1-1-2.2-8-4-14.4-4-14.4a4.78,4.78,0,0,0-9.2,2.6l3,10.7H34A53.57,53.57,0,0,0,9.6,56.7V34.4A24.82,24.82,0,0,1,34.4,9.5ZM84.9,109.7H34.4A24.8,24.8,0,0,1,9.6,84.9v-17A41.77,41.77,0,0,1,34,60.4c1.6,0,3.2.1,4.8.2l6,21.6a4.82,4.82,0,0,0,9.3-.1s2-8.1,4.4-17.4l2.1.6,1.2.3c2.2,8.9,4.1,16.5,4.1,16.5a4.72,4.72,0,0,0,4.6,3.6,4.63,4.63,0,0,0,4.6-3.5l3.4-12.7c10.4,1.6,20.9,1.1,31.3-5.1V85A25,25,0,0,1,84.9,109.7Z\'/%3e%3c/svg%3e' },
]
// tslint:enable: max-line-length

interface IState {
  options: Array<{ url: string, title?: string }>
}

export class ImageSelect extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    this.state = {
      options: JSON.parse(JSON.stringify(Options)),
    }
  }

  public render() {
    const {selected, onSelected} = this.props

    return <div className="card-deck image-select-card-deck">
        {this.state.options.map((o) =>
          <div className={`card ${selected == o.url ? 'selected' : ''}`} key={o.url}
              onClick={() => {
                if (selected == o.url) {
                  // toggle off
                  onSelected(null)
                } else {
                  // toggle on
                  onSelected(o.url)
                }
               } }>

            <div className="card-body">
              <img className="card-img-top" src={o.url} alt={o.title} style={{width: 64, height: 64}}></img>
              {o.title && <h5 className="card-title">{o.title}</h5>}
            </div>
          </div>,
        )}
        <div className="card">
          <div className="card-body">
            <h5>Upload an image</h5>
            <input type="file" name="file"
                className="upload-file"
                id="file"
                onChange={this.handleUploadImage}
                encType="multipart/form-data" />
          </div>
        </div>
      </div>
  }

  private handleUploadImage = (evt) => {
    let reader = new FileReader()
    let file = evt.target.files[0]

    reader.addEventListener('load', (upload) => {
        const result = upload.target.result.toString()
        this.setState({
            options: [
              ...this.state && this.state.options || [],
              { url: result },
            ],
        })
        this.props.onSelected(result)
    })
    reader.readAsDataURL(file)
  }

}
