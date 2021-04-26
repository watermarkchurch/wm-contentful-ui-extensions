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
  didRollThrough?: boolean

  undoKeep?: {
    previousKeptScore: number,
    newKeptDice: number[]
    previousKeptDice: number[],
  }

  turnIndex: number
  priorScores: string[]
}

interface IProps {
}

const InitialDice = () => {
  return JSON.parse(JSON.stringify([
    {index: 0},
    {index: 1},
    {index: 2},
    {index: 3},
    {index: 4},
    {index: 5},
  ]))
}

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
      turnIndex: 1,
    }
  }

  public render() {
    const {
      error, dice, keptDice, rolling, didFarkle, didRollThrough, undoKeep,
      thisRollScore, thisRollMax,
      keptScore, turnIndex, priorScores,
    } = this.state

    const dieProps = {
      dieSize: 105,
      disableIndividual: true,
      dotColor: '#DBDAD6',
      faceColor: '#EF5E24',
      margin: 12,
      outline: false,
      outlineColor: '#373D42',
      rollTime: 0,
      sides: 6,
    }

    // Disable the keep button if the selected dice to keep would include any non-scoring dice
    // This can happen if you get a 3 of a kind and only select 1 or 2 of them
    const showKeep = dice.filter((d) => !d.kept).find((d) => d.pendingKeep)
    const canKeep =
      scoreRoll(dice.filter((d) => d.pendingKeep).map((d) => d.value)).nonScoringDice.length == 0

    return <div id="wrapper">
    <div className={`farkle container ${error ? 'error' : ''}`}>
      <div className="row dice-row">
        {error && <div>
            <h1>Error!</h1>
            <pre>
              {error.message}
            </pre>
          </div>}
        {didFarkle &&
          <div className="didFarkleWrapper">
            <h1>Farkle!</h1>
          </div>}
        {didRollThrough &&
          <div className="didFarkleWrapper">
            <h1>Roll Through!</h1>
          </div>}
        <div className="col-10 d-flex justify-content-center dice" ref={this.diceRef}>
          {dice.map((d) => {
            if (d.kept) {
              return <Die {...dieProps}
                    key={[turnIndex, d.index].join('/')}
                    outline={true}
                    outlineColor="#DBDAD6"
                    faceColor="#FFFFFF"
                    dotColor="#DBDAD6"
                    ref={(die: any) => (this.dice[d.index] = die)}
                    />
            }
            return <Die {...dieProps}
              {...((d.pendingKeep || didFarkle) && {
                faceColor: '#DBDAD6',
                dotColor: '#FFFFFF',
              })}
              key={[turnIndex, d.index].join('/')}
              ref={(die: any) => (this.dice[d.index] = die)}
              onClick={() => this.togglePendingKeep(d)}
              // rolling === undefined if we haven't rolled yet
              rollTime={rolling === undefined ? 0 : randomBetween(0.8, 2.0)}
              rollDone={() => {return}}></Die>
          })}
        </div>
        <div className="col-1 d-flex justify-content-center kept-dice">
          {keptDice.map((idx) => {
            const d = dice[idx]
            return <Die {...dieProps}
              dieSize={30}
              rollTime={0}
              margin={4}
              key={[turnIndex, d.index].join('/')}
              defaultRoll={d.value}
              ></Die>
          })}
        </div>
      </div>
      <div class="row controls-row">
        {/* {showKeep && !canKeep &&
          <span>You must either select all the dice in a set or none of them</span>} */}
        <div class="col-6 scores">
          {thisRollScore !== undefined &&
            <h3 class="badge badge-success">{thisRollScore.total} points</h3>}
          <br/>
          <h3 class="badge badge-text">
            {(thisRollMax && thisRollMax.total || 0) + (keptScore || 0)} total&nbsp;
            {thisRollMax !== undefined && !didRollThrough && 'if you stay'}
          </h3>
        </div>
        <div class="col-6">
          {rolling &&
            <button class="btn" disabled>Rolling...</button>}

          {!rolling && !didFarkle && thisRollScore !== undefined &&
            showKeep &&
              <button class="btn btn-info" disabled={!canKeep} onClick={() => this.keep()}>Keep!</button>}
          
          {!rolling && undoKeep &&
              <button class="btn btn-outline-info" disabled={!canKeep} onClick={() => this.undoKeep()}>Undo</button>}

          {!rolling && !didFarkle && thisRollScore !== undefined && !didRollThrough &&
              <button class="btn btn-outline-info" onClick={() => this.nextTurn()}>Stay!</button>}

          {!rolling && !didFarkle && thisRollMax === undefined &&
              <button class="btn btn-danger" onClick={() => this.roll()}>Roll!</button>
            }
          {!rolling && !didFarkle && didRollThrough &&
              <button class="btn btn-primary" onClick={() => this.rollThrough()}>Roll Through!</button>
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
      thisRollMax: undefined,
      undoKeep: {
        previousKeptDice: keptDice,
        newKeptDice,
        previousKeptScore: this.state.keptScore || 0,
      },
    })
  }

  private undoKeep() {
    if (!this.state.undoKeep) { return }
    const {dice} = this.state
    const {previousKeptDice, newKeptDice, previousKeptScore} = this.state.undoKeep
    newKeptDice.forEach((index) => {
      dice[index].pendingKeep = true
      dice[index].kept = false
    })

    this.setState({
      dice,
      keptDice: previousKeptDice,
      keptScore: previousKeptScore,
      undoKeep: undefined,
    })
    this.updateScore()
  }

  private togglePendingKeep(die: IDieState) {
    const {dice, thisRollMax, didRollThrough} = this.state

    if (!thisRollMax || didRollThrough) { return }

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
    const {dice} = this.state
    this.setState({
      rolling: true,
      thisRollScore: undefined,
      undoKeep: undefined,
    })

    dice.filter((d) => !d.kept).forEach((die, i) => {
      const dieRef = this.dice[die.index]
      const roll = dieRef.getRandomInt()
      dieRef.rollDie(roll)
      die.value = roll
    })

    this.setState({
      dice,
    })
    setTimeout(() =>
      this.rollDone(),
      2000)
  }

  private rollThrough() {
    this.setState({
      turnIndex: this.state.turnIndex + 1,
      keptScore: (this.state.keptScore || 0) + this.state.thisRollScore.total,
      dice: InitialDice(),
      keptDice: [],
      didFarkle: undefined,
      didRollThrough: undefined,
      thisRollScore: undefined,
      thisRollMax: undefined,
      rolling: undefined,
      undoKeep: undefined,
    })
    setTimeout(() =>
      this.roll(),
      400)

  }

  private rollDone() {
    // all done rolling
    this.setState({ rolling: false })
    this.updateScore()
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
      didRollThrough: thisRollMax.nonScoringDice.length == 0,
    })
  }

  private nextTurn() {
    const {didFarkle, thisRollMax, keptScore, turnIndex} = this.state
    let priorScores = this.state.priorScores
    if (!didFarkle) {
      const thisTurnScore = (thisRollMax && thisRollMax.total || 0) + (keptScore || 0)
      priorScores = [thisTurnScore.toString(), ...priorScores]
    } else {
      priorScores = ['farkle! (0 points)', ...priorScores]
    }

    this.setState({
      turnIndex: turnIndex + 1,
      dice: InitialDice(),
      keptDice: [],
      priorScores,
      didFarkle: undefined,
      didRollThrough: undefined,
      thisRollScore: undefined,
      thisRollMax: undefined,
      keptScore: undefined,
      rolling: undefined,
      undoKeep: undefined,
    })
  }
}

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<Farkle />,
    document.getElementById('react-root')!)
})

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}
