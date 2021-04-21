import isEqual from 'lodash-es/isEqual'

export function scoreRoll(dice: number[]) {
  dice = dice.sort()

  if (isEqual([1, 2, 3, 4, 5, 6], dice)) {
    return 1500
  }

  let subtotal = 0

  // check triples
  while (dice.length >= 3) {
    for (const num of [1, 6, 5, 4, 3, 2]) {
      if (dice.filter((n) => n == num).length >= 3) {
        // 3 of num exist in the dice array
        subtotal += num == 1 ? 1000 : num * 100
        for (let i = 0; i < 3; i++) {
          // remove them
          dice.splice(dice.indexOf(num), 1)
        }
        // go through the loop again
        continue
      }
    }
    // no triples
    break
  }

  // check 1s
  subtotal += dice.filter((n) => n == 1).length * 100
  // check 5s
  subtotal += dice.filter((n) => n == 5).length * 50

  return subtotal
}
