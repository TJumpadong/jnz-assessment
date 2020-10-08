const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const max = (a, b) => a > b ? a : b
const min = (a, b) => a < b ? a : b

const isDraw = board => !board.filter(p => p === 0).length
const isOver = board => {
  for (let player of [1, 2]) {
    for (let position of winPatterns) {
      if (board[position[0]] === player && board[position[1]] === player && board[position[2]] === player) {
        return true
      }
    }
  }

  return false
}

const minimax = (board, depth, isMaximizingPlayer) => {
  if (isOver(board)) {
    return isMaximizingPlayer ? -10 : 10
  }
  if (depth === 0 || isDraw(board)) {
    return 0
  }

  if (isMaximizingPlayer) {
    let maxVal = -100

    for (let i = 0; i < board.length; ++i) {
      if (board[i] === 0) {
        const child = board.slice()
        child[i] = 2
        const val = minimax(child, depth - 1, false)
        maxVal = max(maxVal, val)
      }
    }

    return maxVal
  } else {
    let minVal = 100

    for (let i = 0; i < board.length; ++i) {
      if (board[i] === 0) {
        const child = board.slice()
        child[i] = 1
        const val = minimax(child, depth - 1, true)
        minVal = min(minVal, val)
      }
    }

    return minVal
  }
}

const findBestMove = checked => {
  let bestValue = -100
  let bestMove

  for (let i = 0; i < 9; ++i) {
    if (checked[i] === 0) {
      const move = checked.slice()
      move[i] = 2
      const val = minimax(move, 10, false)
      bestValue = max(bestValue, val)
      if (bestValue === 10) return i
      if (bestValue === val) bestMove = i
    }
  }

  return bestMove
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const resultMessage = document.getElementById('result-message')
  const squares = Array.from(document.querySelectorAll('.grid div'))
  let currentPlayer = 'o'
  let gameEnded = false

  const checked = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const togglePlayer = () => {
    currentPlayer = currentPlayer === 'o' ? 'x' : 'o'
  }

  const checkWinner = (player) => {
    if (isOver(checked)) {
      resultMessage.innerHTML = `${player === 'x' ? 'ORANGE' : 'GREEN'} WINS`
      gameEnded = true
    } else if (isDraw(checked)) {
      resultMessage.innerHTML = 'DRAW'
      gameEnded = true
    }

    togglePlayer()
  }

  grid.addEventListener('click', event => {
    if (!gameEnded && event.target.id) {
      const targetId = parseInt(event.target.id, 10) - 1

      if (!checked[targetId]) {
        squares[targetId].classList.add(`check-${currentPlayer}`)
        checked[targetId] = 1
        checkWinner(currentPlayer)

        if (!gameEnded) {
          const position = findBestMove(checked)
          squares[position].classList.add(`check-${currentPlayer}`)
          checked[position] = 2
          checkWinner(currentPlayer)
        }
      }
    }
  })
})
