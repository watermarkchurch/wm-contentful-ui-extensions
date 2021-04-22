import type {} from 'bootstrap'
import {Component, createRef, h, render} from 'preact'
import Die from '../../vendor/react-dice-complete/src/Die'

import '../../vendor/react-dice-complete/src/styles.scss'
import { AsyncErrorHandler } from '../lib/async-error-handler'
import { injectBootstrap } from '../lib/utils'
import { IScore, scoreRoll } from './scoring'
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
  thisRollMax?: IScore
  thisRollScore?: IScore
  keptScore?: number
  didFarkle?: boolean

  priorScores: number[]
}

interface IProps {
}

const InitialDice = () => [
  {index: 0},
  {index: 1},
  {index: 2},
  {index: 3},
  {index: 4},
  {index: 5},
]

export class Farkle extends Component<IProps, IAppState> {
  private readonly errorHandler = new AsyncErrorHandler(this)
  private diceRef = createRef()

  private dice = new Array(6)

  constructor(props: IProps, context?: any) {
    super(props, context)

    this.state = {
      dice: InitialDice(),
      keptDice: [],
      priorScores: [],
    }
  }

  public render() {
    const { error, dice, keptDice, rolling, didFarkle, thisRollScore, keptScore, priorScores } = this.state

    const dieProps = {
      dieSize: 120,
      disableIndividual: true,
      dotColor: '#DBDAD6',
      faceColor: '#EF5E24',
      margin: 15,
      outline: false,
      outlineColor: '#373D42',
      // rolling === undefined if we haven't rolled yet
      rollTime: rolling === undefined ? 0 : 2,
      sides: 6,
    }

    const remainingDice = dice.filter((d) => !d.kept)

    return <div id="wrapper">
    <div className={`farkle container ${error ? 'error' : ''}`}>
      <div className="row dice-row">
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
      </div>
      <div class="row controls-row">
        <div class="col-6 scores">
          {thisRollScore !== undefined &&
            <h3 class="badge badge-success">{thisRollScore} points</h3>}
          <br/>
          <h3 class="badge badge-text">
            {(thisRollScore && thisRollScore.total || 0) + (keptScore || 0)} total&nbsp;
            {thisRollScore !== undefined && 'if you stay'}
          </h3>
        </div>
        <div class="col-6">
          {rolling &&
            <button class="btn btn-outline" disabled>Rolling...</button>}

          {!rolling && !didFarkle && thisRollScore !== undefined &&
            (remainingDice.find((d) => d.pendingKeep) &&
              <button class="btn btn-info" onClick={() => this.keep()}>Keep!</button>)}

          {!rolling && !didFarkle && thisRollScore !== undefined &&
              <button class="btn btn-info" onClick={() => this.nextTurn()}>Stay!</button>}

          {!rolling && !didFarkle && (thisRollScore === undefined || !remainingDice.find((d) => d.pendingKeep)) &&
              <button class="btn btn-primary" onClick={() => this.roll()}>Roll!</button>
            }

          {!rolling && didFarkle &&
            <button class="btn btn-info" onClick={() => this.nextTurn()}>Next Turn!</button>}
        </div>
      </div>
    </div>
    <div className="container">
      <div className="col-12">
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
      keptScore: (this.state.keptScore || 0) + this.state.thisRollScore.total,
      thisRollScore: undefined,
    })
  }

  private togglePendingKeep(die: IDieState) {
    const {dice, thisRollMax} = this.state

    if (!thisRollMax) { return }

    if (dice[die.index].pendingKeep) {
      // we can always untoggle it
      dice[die.index].pendingKeep = false
    } else {
      // can we keep this die or not?  It must be a scoring die
      const availableScoringDice = [...thisRollMax.scoringDice]
      for (const d of dice) {
        if (d.pendingKeep) {
          // we're already keeping this "1" or "5" (or one of our 3 "4"s etc)
          availableScoringDice.splice(availableScoringDice.indexOf(d.value), 1)
        }
      }
      if (availableScoringDice.indexOf(die.value) != -1) {
        // Yes, this one is not one of the available scoring dice.
        dice[die.index].pendingKeep = true
      }
    }

    this.setState({
      dice,
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
      // all done rolling
      this.setState({ rolling: false })
      this.updateScore()
    }
  }

  private updateScore() {
    const remainingDice = this.state.dice.filter((d) => !d.kept)
    const thisRollMax = scoreRoll(remainingDice.map((d) => d.value))
    const didFarkle = thisRollMax.scoringDice.length == 0
    if (didFarkle) {
      this.setState({
        didFarkle: true,
      })
    }

    const pendingKeepDice = remainingDice.filter((d) => d.pendingKeep)

    const diceToScore = pendingKeepDice.length > 0 ? pendingKeepDice : remainingDice
    const thisRollScore = scoreRoll(diceToScore.map((d) => d.value))
    this.setState({
      thisRollMax,
      thisRollScore,
    })
  }

  private nextTurn() {
    const {didFarkle, priorScores, thisRollScore, keptScore} = this.state
    if (!didFarkle) {
      const thisTurnScore = (thisRollScore && thisRollScore.total || 0) + (keptScore || 0)
      this.setState({
        priorScores: [thisTurnScore, ...priorScores],
      })
    }

    this.setState({
      dice: InitialDice(),
      keptDice: [],
      didFarkle: undefined,
      thisRollScore: undefined,
      keptScore: undefined,
      rolling: undefined,
    })
  }
}

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<Farkle />,
    document.getElementById('react-root')!)
})
