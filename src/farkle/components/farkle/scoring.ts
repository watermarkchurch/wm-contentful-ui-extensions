import isEqual from 'lodash-es/isEqual'

export interface IScore {
  total: number,
  scoringDice: number[],
  nonScoringDice: number[]
}

export function scoreRoll(dice: number[]): IScore {
  const remainingDice = [...dice].sort()
  const scoringDice: number[] = []

  if (isEqual([1, 2, 3, 4, 5, 6], remainingDice)) {
    return { total: 1500, scoringDice: remainingDice, nonScoringDice: [] }
  }

  let subtotal = 0

  // check triples
  while (remainingDice.length >= 3) {
    for (const num of [1, 6, 5, 4, 3, 2]) {
      if (remainingDice.filter((n) => n == num).length >= 3) {
        // 3 of num exist in the dice array
        subtotal += num == 1 ? 1000 : num * 100
        for (let i = 0; i < 3; i++) {
          // remove them
          scoringDice.push(num)
          remainingDice.splice(remainingDice.indexOf(num), 1)
        }
        // go through the loop again
        continue
      }
    }
    // no triples
    break
  }

  // check 1s & 5s
  [...remainingDice].forEach((n) => {
    if (n == 1 || n == 5) {
      scoringDice.push(n)
      remainingDice.splice(remainingDice.indexOf(n), 1)
    }
    if (n == 1) { subtotal += 100 }
    if (n == 5) { subtotal += 50 }
  })

  return {
    total: subtotal,
    scoringDice,
    nonScoringDice: remainingDice,
  }
}
