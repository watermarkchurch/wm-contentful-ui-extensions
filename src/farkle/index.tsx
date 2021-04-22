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
  pendingKeep?: boolean

  rolling?: boolean
}

interface IAppState {
  error?: any | null

  dice: IDieState[]
  keptDice: number[]

  rolling?: boolean
  thisRollScore?: number
  keptScore?: number

  priorScores: number[]
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
      keptDice: [],
      priorScores: [],
    }
    this.componentDidMount = this.errorHandler.wrap(this, this.componentDidMount)
  }

  public async componentDidMount() {
    this.roll()
  }

  public render() {
    const { error, dice, keptDice, rolling, thisRollScore, keptScore, priorScores } = this.state

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
              {...(d.pendingKeep && {
                faceColor: '#DBDAD6',
                dotColor: '#FFFFFF',
              })}
              key={d.index}
              ref={(die: any) => (this.dice[d.index] = die)}
              onClick={() => this.togglePendingKeep(d)}
              rollDone={() => this.rollDone(d)}></Die>
          })}
        </div>
        <div className="col-12 d-flex justify-content-center dice">
          {keptDice.map((idx) => {
            const d = dice[idx]
            return <Die {...dieProps}
              dieSize={30}
              rollTime={0}
              margin={5}
              key={d.index}
              defaultRoll={d.value}
              ref={(die: any) => (this.dice[d.index] = die)}
              ></Die>
          })}
        </div>
        <hr />
        <div class="col-6">
          {thisRollScore !== undefined &&
            <span class="badge badge-success">{thisRollScore} points</span>}
          <br/>
          <span class="badge badge-text">
            {(thisRollScore || 0) + (keptScore || 0)} total&nbsp;
            {thisRollScore !== undefined && 'if you keep'}
          </span>
          <hr/>
          <table>
            <thead>
              <th>
                <td>Previous Turns</td>
              </th>
            </thead>
            <tbody>
              {priorScores.map((score) => {
                return <tr>
                  <td>{score}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div class="col-6">
          {rolling &&
            <button class="btn btn-outline" disabled>Rolling...</button>}

          {!rolling && thisRollScore !== undefined &&
            (remainingDice.find((d) => d.pendingKeep) &&
              <button class="btn btn-info" onClick={() => this.keep()}>Keep!</button>)}

          {!rolling && thisRollScore !== undefined &&
              <button class="btn btn-info">Stay!</button>}

          {!rolling && (thisRollScore === undefined || !remainingDice.find((d) => d.pendingKeep)) &&
              <button class="btn btn-primary" onClick={() => this.roll()}>Roll!</button>
            }
        </div>
      </div>
    </div>
  }

  private keep() {
    const {dice, keptDice} = this.state
    const newKeptDice: number[] = []
    dice.filter((d) => d.pendingKeep).forEach((d) => {
      dice[d.index].pendingKeep = false
      dice[d.index].kept = true
      newKeptDice.push(d.index)
    })
    this.setState({
      dice,
      keptDice: [...keptDice, ...newKeptDice],
      keptScore: (this.state.keptScore || 0) + this.state.thisRollScore,
      thisRollScore: undefined,
    })
  }

  private togglePendingKeep(d: IDieState) {
    const s = this.state.dice
    s[d.index].pendingKeep = !s[d.index].pendingKeep
    this.setState({
      dice: s,
    })
    this.updateScore()
  }

  private roll() {
    const state = this.state.dice
    this.setState({
      rolling: true,
      thisRollScore: undefined,
    })

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

  private rollDone(die: IDieState) {
    const state = this.state.dice
    state[die.index].rolling = false
    this.setState({
      dice: state,
    })
    if (!state.find((d) => d.rolling)) {
      console.log('all done rolling!')
      // all done rolling
      this.setState({ rolling: false })
      this.updateScore()
    }
  }

  private updateScore() {
    const remainingDice = this.state.dice.filter((d) => !d.kept)
    const pendingKeepDice = remainingDice.filter((d) => d.pendingKeep)

    const diceToScore = pendingKeepDice.length > 0 ? pendingKeepDice : remainingDice
    this.setState({
      thisRollScore: scoreRoll(diceToScore.map((d) => d.value)),
    })
  }
}

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<Farkle />,
    document.getElementById('react-root')!)
})
