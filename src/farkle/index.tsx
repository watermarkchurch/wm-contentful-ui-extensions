import type {} from 'bootstrap'
import {Component, createRef, h, render} from 'preact'
import Die from '../../vendor/react-dice-complete/src/Die'

import '../../vendor/react-dice-complete/src/styles.scss'
import { AsyncErrorHandler } from '../lib/async-error-handler'
import { injectBootstrap } from '../lib/utils'
import { scoreRoll } from './scoring'
import './style.scss'

interface IDieState {
  index: number
  value?: number,
  kept?: boolean

  rolling?: boolean
}

interface IAppState {
  error?: any | null

  dice: IDieState[]

  currentMaxScore: number
  currentKeptScore: number
}

interface IProps {
}

export class Farkle extends Component<IProps, IAppState> {
  private readonly errorHandler = new AsyncErrorHandler(this)
  private diceRef = createRef()

  private dice = new Array(6)

  constructor(props: IProps, context?: any) {
    super(props, context)

    const dice = [
      {index: 0},
      {index: 1},
      {index: 2},
      {index: 3},
      {index: 4},
      {index: 5},
    ]
    console.log('dice', dice)
    this.state = {
      dice,
      scoreHistory: [],
    }
    this.componentDidMount = this.errorHandler.wrap(this, this.componentDidMount)
  }

  public async componentDidMount() {
    this.roll()
  }

  public render() {
    const { error, dice } = this.state

    const dieProps = {
      dieSize: 120,
      disableIndividual: true,
      dotColor: '#DBDAD6',
      faceColor: '#EF5E24',
      margin: 15,
      outline: false,
      outlineColor: '#373D42',
      rollTime: 2,
      sides: 6,
    }

    const keptDice = dice.filter((d) => d.kept)
    const remainingDice = dice.filter((d) => !d.kept)

    return <div className={`farkle container-fluid ${error ? 'error' : ''}`}>
      <div className="row">
        {error && <div>
            <h1>Error!</h1>
            <pre>
              {error.message}
            </pre>
          </div>}
        <div className="col-12 d-flex justify-content-center dice" ref={this.diceRef}>
          {remainingDice.map((d) => {
            return <Die {...dieProps}
              key={d.index}
              ref={(die: any) => (this.dice[d.index] = die)}
              rollDone={() => this.rollDone(d)}></Die>
          })}
        </div>
        {}
      </div>
    </div>
  }

  private roll() {
    const state = this.state.dice

    this.dice.forEach((d, i) => {
      if (!d || !state[i] || state[i].kept) {
        // skip this one
        return
      }

      state[i].rolling = true
      const roll = d.getRandomInt()
      d.rollDie(roll)
      state[i].value = roll
    })

    this.setState({
      dice: state,
    })
  }

  private rollDone(d: IDieState) {
    const state = this.state.dice
    state[d.index].rolling = false
    this.setState({
      dice: state,
    })
    if (!state.find((d) => d.rolling)) {
      // all done rolling
      this.updateScore()
    }
  }

  private updateScore() {
    const remainingDice = this.state.dice.filter((d) => !d.kept)
  }
}

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<Farkle />,
    document.getElementById('react-root')!)
})
