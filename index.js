const express = require('express')
const path = require('path')
const twentyfour = require('./twentyfour')
const app = express()
const port = 3000

app.use(express.static('tictactoe'))

app.get('/tictactoe', (req, res) => {
  res.sendFile(path.join(__dirname + '/tictactoe/index.html'))
})

app.get('/twentyfour', (req, res) => {
  const { numbers } = req.query
  const result = twentyfour.calculate(numbers)
  res.send(result)
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
