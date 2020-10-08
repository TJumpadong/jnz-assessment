# JNZ Assessments

## Prerequisite
* NodeJS and NPM installed
* Browser

## How to run
```
> npm install
> npm start
```
The API will be served at `http://localhost:3000`

## Twenty-four game
A simple API to solve [24 game](https://en.wikipedia.org/wiki/24_Game)
Get the possibility to solve this by passing 4 digits (1-9) as a query string
For example if want to pass `1 2 3 4`
```
GET: http://localhost:3000/twentyfour?numbers=1%20%20%202%203%204
```

## Tic-Tac-Toe
The impossible-to-beat Tic-Tac-Toe game. Implemented by Minimax algorith (with depth-10).
Enjoy playing on a browser with this URL
```
http://localhost:3000/tictactoe
```
