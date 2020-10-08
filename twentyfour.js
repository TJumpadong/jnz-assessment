const readline = require('readline')
const assert = require('assert')

// return list of determinate calculation
// [a + b, a * b, a - b, a / b, a - b, a / b]
const calculateTerms = (a, b) => {
  const baseTerms = [a * b, a + b, a - b, b - a]
  if (a === 0 && b === 0) return baseTerms
  if (a === 0 || b === 0) return baseTerms.concat(0)
  return baseTerms.concat([a / b, b / a])
}

// a op b op c op d
// a op (b op c op d)
// a op (b op (c op d))
// a op ((b op c) op d)
// and so on
const isSolvedByOrdering = numbers => {
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (i !== j) {
        // first expression
        const firstTerms = calculateTerms(numbers[i], numbers[j])

        for (let firstTerm of firstTerms) {
          for (let k = 0; k < 4; ++k) {
            if (i !== k && j !== k) {
              // second expression
              const secondTerms = calculateTerms(firstTerm, numbers[k])

              for (let secondTerm of secondTerms) {
                for (let l = 0; l < 4; ++l) {
                  if (i !== l && j !== l && k !== l) {
                    const lastTerms = calculateTerms(secondTerm, numbers[l])
                    if (lastTerms.includes(24)) return true
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return false
}

// (a op b) op (c op d)
const isSolvedByGrouping = numbers => {
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (i !== j) {
        // first expression
        const firstTerms = calculateTerms(numbers[i], numbers[j])

        for (let k = 0; k < 4; ++k) {
          for (let l = 0; l < 4; ++l) {
            // pair unique values
            if (i !== k && j !== k && i !== l && j !== l && k !== l) {
              // second expression
              const secondTerms = calculateTerms(numbers[k], numbers[l])

              for (let firstTerm of firstTerms) {
                for (let secondTerm of secondTerms) {
                  const lastTerms = calculateTerms(firstTerm, secondTerm)
                  if (lastTerms.includes(24)) return true
                }
              }
            }
          }
        }
      }
    }
  }

  return false
}

const isPossibleToSolve = numbers => {
  return isSolvedByOrdering(numbers) || isSolvedByGrouping(numbers)
}

// read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Please enter 4 digits (1-9) separated by spaces: ', line => {
  const rawInputList = line.trim().replace(/\s+/g, ' ')

  if (/[1-9] [1-9] [1-9] [1-9]/.test(rawInputList)) {
    const numbers = rawInputList.split(' ').map(number => parseInt(number, 10))

    const isSolved = isPossibleToSolve(numbers)
    console.log(isSolved)
  } else {
    console.log('Invalid format')
  }

  rl.close()
})

// testing data
/*
assert(isPossibleToSolve([1, 1, 5, 8]))
assert(!isPossibleToSolve([1, 1, 5, 9]))
assert(isPossibleToSolve([1, 1, 6, 6]))
assert(isPossibleToSolve([1, 1, 2, 9]))
assert(isPossibleToSolve([4, 4, 4, 4]))
assert(isPossibleToSolve([4, 4, 9, 12]))
*/
