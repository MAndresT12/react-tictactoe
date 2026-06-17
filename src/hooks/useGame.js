
import { checkWinner } from "../logic/board"
import { checkEndGame } from "../logic/board"
import { TURNS } from "../constants"
import { EMPTY_BOARD } from "../constants"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { saveGameToStorage } from "../logic/storage"
import { resetGameToStorage } from "../logic/storage"


export function useGame(){

    //UseState NUNCA JAMAS PONERLO DENTRO DE UN CONDICIONAL, CICLO O FUNCION, SIEMPRE DEBE ESTAR EN EL NIVEL MAS ALTO DE NUESTRO COMPONENTE, SI NO, PUEDE CAUSAR ERRORES EN NUESTRO COMPONENTE, PORQUE REACT UTILIZA EL ORDEN DE LOS HOOKS PARA SABER QUE ESTADO CORRESPONDE A CADA USESTATE, SI LO PONES DENTRO DE UN CONDICIONAL, CICLO O FUNCION, PUEDE CAMBIAR EL ORDEN Y CAUSAR ERRORES EN NUESTRO COMPONENTE
    //Siempre en cuerpo de componente, no dentro de condicionales, ciclos o funciones
    // const [board, setBoard] = useState(EMPTY_BOARD)

    //Entonces podemos hacer es que en lugar de pasar directamente valor podemos pasar una funcion que retorne el valor, de esta manera, la funcion solo se ejecutara la primera vez que se renderice el componente, y no cada vez que se actualice el estado, lo cual es mas eficiente, ya que no queremos ejecutar esa logica cada vez que se actualice el estado, solo queremos ejecutarla la primera vez que se renderice el componente
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : EMPTY_BOARD
    })
  // const [turn, setTurn] = useState(TURNS.X) esto cambiar para recibir de local storage
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn') ? window.localStorage.getItem('turn') :   TURNS.X
    // const turnFromStorage = window.localStorage.getItem('turn') 
    // return turnFromStorage ?? TURNS.X

    //turnFromStorage ?? TURNS.X mira si turnFromStorage es null o undefined, si es null o undefined, entonces retorna TURNS.X, si no es null o undefined, entonces retorna turnFromStorage
    //turnFromStorage ? turnFromStorage : TURNS.X //si turnFromStorage es null o undefined, entonces retorna TURNS.X, si no es null o undefined, entonces retorna turnFromStorage
    //turnFromStorage || TURNS.X con || mira si turnFromStorage es falsy, si es falsy, entonces retorna TURNS.X, si no es falsy, entonces retorna turnFromStorage
    //diferencia entre ?? y || es que ?? solo retorna TURNS.X si turnFromStorage es null o undefined, mientras que || retorna TURNS.X si turnFromStorage es cualquier valor falsy, como 0, '', false, null, undefined, NaN
    return turnFromStorage
  })
  
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false es empate, y si es X u O es que hay un ganador, igual podria ser con un enum

  const updateBoard = (index) => {

    if(board[index]  || winner) return

    const newBoard = [...board]

    
    newBoard[index] = turn //x u o
    setBoard(newBoard)

    //Cambiar el turno del jugador, si es turno X, el siguiente turno es O, y viceversa
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn)
    //2.
    //Si hacemos estado tablero, en localStorage puedes guardar un string, si quieres guardar un array, debes convertirlo a string con JSON.stringify, y para recuperarlo debes convertirlo a array con JSON.parse
    //queremos que nos guarde un string y vamos a guardar stringify para que array convierta en string y podemos volver a utilizar
    // window.localStorage.setItem('board', newBoard)
    // window.localStorage.setItem('turn', newTurn)

      //FORMA IMPERATIVA PODRIAMOS USAR USEEFFECT
      // saveGameToStorage({
      //   board: newBoard,
      //   turn: newTurn
      // })
      // saveGameToStorage(newBoard, newTurn)


    //Potencia estado en react
    //1.Que podemos hacer para asegurarnos que cada vez que actualizamos, si tenemos partida a medias seguir jugando (localStorage)
    //Cada vez haya movimiento.... podriamos guardar todo el estado cuando tenemos un ganador y tal, pero mejor hacerlo antes de saber si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    }
    else if (checkEndGame(newBoard)) {
      setWinner(false) //Empate
    }
  }

    useEffect(() => {
      //guardar aqui partida
      saveGameToStorage({
        board,turn
      })
    }, [board, turn]) //cada vez que board o turn cambie, se ejecutara el codigo dentro del useEffect, y guardara la partida en localStorage  

  const resetGame = () => {
    setBoard(EMPTY_BOARD)
    setTurn(TURNS.X)
    setWinner(null)
    resetGameToStorage()

  }

  return {board, turn, winner, updateBoard, resetGame}
}