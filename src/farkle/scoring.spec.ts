import {render} from '@testing-library/preact'
import {expect} from 'chai'
import {} from 'mocha'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { stubClient, stubSdk } from '../lib/spec-helpers'
import {scoreRoll} from './scoring'

// tslint:disable: no-unused-expression

describe('farkle scoring', () => {
  it('finds a straight', () => {
    // act
    const score = scoreRoll([1, 5, 4, 2, 3, 6])

    // assert
    expect(score.total).to.equal(1500)
    expect(score.nonScoringDice).to.deep.equal([])
    expect(score.scoringDice).to.deep.equal([1, 2, 3, 4, 5, 6])
  })

  it('finds single set', () => {
    // act
    const score = scoreRoll([2, 3, 4, 2, 2])

    // assert
    expect(score.total).to.equal(200)
    expect(score.nonScoringDice).to.deep.equal([3, 4])
    expect(score.scoringDice).to.deep.equal([2, 2, 2])
  })

  it('finds multiple sets', () => {
    // act
    const score = scoreRoll([1, 3, 1, 3, 3, 1])

    // assert
    expect(score.total).to.equal(1300)
    expect(score.nonScoringDice).to.deep.equal([])
    expect(score.scoringDice).to.deep.equal([1, 1, 1, 3, 3, 3])
  })

  it('discovers a farkle', () => {
    // act
    const score = scoreRoll([2, 3, 6, 4, 2, 6])

    // assert
    expect(score.total).to.equal(0)
    expect(score.nonScoringDice).to.deep.equal([2, 2, 3, 4, 6, 6])
    expect(score.scoringDice).to.deep.equal([])
  })
})
