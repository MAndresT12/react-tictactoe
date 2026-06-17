import { WINNER_COMBOS } from "../constants";

//Esta logica ahora se puede usar en componente de react, angular, vue, svelte, etc. ya que no depende de ninguna libreria, solo de javascript
//Todo es javascript

//Muchas maneras para ver si hay un ganador, una de ellas es crear una funcion que recorra el tablero y ver si hay 3 fichas en linea, otra manera es crear un array con las combinaciones ganadoras, y luego verificar si alguna de esas combinaciones esta presente en el tablero, otra manera es usar una libreria como tic-tac-toe-winner, que nos permite verificar si hay un ganador de manera sencilla
export const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      //recuperar posiciones 0,1,2, luego 3,4,5, luego 6,7,8, luego 0,3,6, luego 1,4,7, luego 2,5,8, luego 0,4,8 y luego 2,4,6
      const [a, b, c] = combo
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null
  } 

  //11. revisar si el juego ha terminado, es decir, si se han llenado todas las casillas sin que haya un ganador, entonces es un empate
export  const checkEndGame = (boardToCheck) => {
    //Si no hay ninguna casilla vacia, entonces el juego ha terminado
    return boardToCheck.every((square) => square !== null)
  }