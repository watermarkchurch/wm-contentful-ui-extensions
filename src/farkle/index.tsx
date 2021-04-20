import type {} from 'bootstrap'
import {Component, createRef, h, render} from 'preact'
import Die from '../../vendor/react-dice-complete/src/Die'

import '../../vendor/react-dice-complete/src/styles.scss'
import { AsyncErrorHandler } from '../lib/async-error-handler'
import { injectBootstrap } from '../lib/utils'
import './style.scss'

interface IAppState {
  error?: any | null
}

interface IProps {
}

export class Farkle extends Component<IProps, IAppState> {
  private readonly errorHandler = new AsyncErrorHandler(this)
  private diceRef = createRef()

  constructor(props: IProps, context?: any) {
    super(props, context)

    this.state = {
    }
    this.componentDidMount = this.errorHandler.wrap(this, this.componentDidMount)
  }

  public async componentDidMount() {
    const w = $(this.diceRef.current).innerWidth()

    console.log('width:', w)
  }

  public render() {
    const { error } = this.state

    const dieProps = {
      defaultRoll: 4,
      dieSize: 120,
      disableIndividual: false,
      dotColor: '#1dff00',
      faceColor: '#ff00ac',
      margin: 15,
      outline: false,
      outlineColor: '#000000',
      rollTime: 2,
      sides: 6,
    }

    return <div className={`farkle container-fluid ${error ? 'error' : ''}`}>
      <div className="row">
        {error && <div>
            <h1>Error!</h1>
            <pre>
              {error.message}
            </pre>
          </div>}
        <div className="col-12 d-flex justify-content-center dice" ref={this.diceRef}>
          <Die {...dieProps} rollDone={() => null}></Die>
          <Die {...dieProps} rollDone={() => null}></Die>
          <Die {...dieProps} rollDone={() => null}></Die>
          <Die {...dieProps} rollDone={() => null}></Die>
          <Die {...dieProps} rollDone={() => null}></Die>
          <Die {...dieProps} rollDone={() => null}></Die>
        </div>
      </div>
    </div>
  }
}

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<Farkle />,
    document.getElementById('react-root')!)
})
