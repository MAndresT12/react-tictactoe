import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { TURNS } from './constants.js'
import {checkWinner, checkEndGame} from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Board } from './components/Board.jsx'
import { TurnIndicator } from './components/TurnIndicator.jsx'
import { useGame } from './hooks/useGame.js'
function App() {

  const {board, turn, winner, updateBoard, resetGame} = useGame()

  return (
    //1. Renderizamos el tablero
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
        <Board board={board} updateBoard={updateBoard}/>


      <TurnIndicator turn={turn}/>


       <WinnerModal winner={winner} resetGame={resetGame}/>

    </main>
   
  )
}

export default App
