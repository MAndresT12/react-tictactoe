import { useState } from "react";
import App from "./App";

const TURNS = {
  X: 'x',
  O: 'o'
}

// const board = Array(9).fill(null)



const Square = ({children, index, isSelected, updateBoard}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
  
} 

const WINNER_COMBOS = [
  [0,1,2],
  [0,4,8],
  [0,3,6],
  [1,4,7],
  [2,4,6],
  [2,5,8],
  [3,4,5],
  [6,7,8]


]

function AppCopy() {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array(9).fill(null))
  //null no ganador, false empate, y si es X u O es ganador
  const [isWinner, setWinner] = useState(null)

  const updateBoard = (index) =>{
    //si ya hay algo en esa posicion, no hacemos nada
    if(board[index]) return
    //Ahora debemos actualizar el tablero, para eso hacemos una copia y actualizamos posicion
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiamos el turno, para eso hacemos una copia del turno y actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
  }

  //Esto mejorar
  const checkWinner = (checkBoard) =>{
    //revisamos todas las combinaciones ganadoras, y si alguna de ellas esta presente en el tablero, entonces tenemos un ganador
    for (const combos of WINNER_COMBOS){
      const [a,b,c] = combos
      if (checkBoard[a] && checkBoard[a] === checkBoard[b] && checkBoard[a] === checkBoard[c]){
        return checkBoard[a]
      }
    }
    return null

  }
  return (
    <div className="board">
      <h1>App Copy</h1>
      <div className="game">

        {board.map((_, index) => {
          return (<div key={index} className="cell"> 
          
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          </div>)
        })}
      </div>

        <section className="turn">
          <Square  isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square  isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

    </div>
  )
}

export default AppCopy