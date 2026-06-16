import { useState } from 'react'
import './App.css'
//1.
const TURNS = {
  X: 'x',
  O: 'o'
}

//2. Creamos el tablero, es un array de 9 elementos, cada elemento representa una casilla del tablero, el valor de cada elemento es null, lo que significa que la casilla esta vacia
// const board = Array(9).fill(null)

//Vamos a crear un juego de tic tac toe, el tablero es de 3x3, cada jugador tiene un turno para colocar su ficha, el primero en colocar 3 fichas en linea gana, si se llenan las casillas sin que nadie gane, es un empate
//Square
//children lo que va a tener dentro del tablero la x o la o, el index del tablero, el turno del jugador, la funcion para actualizar el tablero, la funcion para cambiar el turno
// updateBoard es la funcion para actualizar el tablero, recibe el index del tablero y el turno del jugador, luego actualiza el tablero con la ficha del jugador en la posicion correspondiente
// index (para saber ese cuadradito que indice es) es el index del tablero, se utiliza para saber en que posicion del tablero se encuentra la ficha del jugador
const Square = ({children, updateBoard, index, isSelected}) => {
  //6. Ahora tenermos classname renderizado condicional (aunque sea solo de quien le toca el turno)
  const className = `square ${isSelected ? 'is-selected' : ''}`
  //updateBoard es la funcion para actualizar el tablero, recibe el index del tablero y el turno del jugador, luego actualiza el tablero con la ficha del jugador en la posicion correspondiente
  //Cuando se haga click en el cuadradito, vamos a llamar a la funcion updateBoard, le pasamos el index del tablero para saber en que posicion del tablero se encuentra la ficha del jugador, y el turno del jugador para saber que ficha colocar
  //7. cuando se haga click en el cuadradito, vamos a llamar a la funcion updateBoard (definida en el renderizado de app)
  // , le pasamos el index del tablero para saber en que posicion del tablero se encuentra la ficha del jugador
  // , y el turno del jugador para saber que ficha colocar
  //8. Ahora vamos a hacer que el cuadradito se pueda clickear, para eso vamos a agregar un evento onClick a
  // l cuadradito, y cuando se haga click, vamos a llamar a la funcion updateBoard, le pasamos el index 
  // del tablero para saber en que posicion del tablero se encuentra la ficha del jugador, y el turno del 
  // jugador para saber que ficha colocar
  const handleClick = () => {
    updateBoard(index)
  } 
  return (
    <div className={className} onClick={handleClick}>
      <span className="cell_content">
        {children}
      </span>
    </div>
  )
} 

//9. podriamos tener winner_combos, y tener combinaciones ganadoras, pero no es optima
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {

  //4. Ahora queremos mostrar cuando cliquee en celda X o O (pulsa), entonces en <Squeare> quitamos el index.
  // necesitamos un estado para guardar cuando el usuario hace click en cada posicion, entonces el board debemos pasarlo
  // dentro de la aplicacion, para eso usamos el hook useState, que nos permite crear un estado para el tablero, y una funcion para 
  // actualizar ese estado, el estado inicial del tablero es un array de 9 elementos, cada elemento es null, lo que significa 
  // que la casilla esta vacia
  //Cuando en square se haga click vamos a tener que actualizar el tablero, para volver a renderizarlo y usuario
  // pueda ver si se ha puesto x o no
  // const board = Array(9).fill(null)
  // const [board, setBoard] = useState(Array(9).fill(null))
  // const [board, setBoard] = useState(['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'])
  const [board, setBoard] = useState(Array(9).fill(null))

  //5. Ahora saber cuando tenemos un ganador, como hacemos que detecte que hay un ganador
  //Cada vez user haga click en uno y actualizamos tablero, voy a ver si ha ganado o no ha ganado, entonces como sabemos
  //para hacer click que actualice el tablero, como sabemos el turno del jugador??? Con otro estado, saber si es turno X o O
  const [turn, setTurn] = useState(TURNS.X)
  
  //9. Ahora vamos a verificar el ganador, saber cuando hemos ganado parar el juego (decir oye paramos el juego)
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false es empate, y si es X u O es que hay un ganador, igual podria ser con un enum
  //Muchas maneras para ver si hay un ganador, una de ellas es crear una funcion que recorra el tablero y ver si hay 3 fichas en linea, otra manera es crear un array con las combinaciones ganadoras, y luego verificar si alguna de esas combinaciones esta presente en el tablero, otra manera es usar una libreria como tic-tac-toe-winner, que nos permite verificar si hay un ganador de manera sencilla
  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      //recuperar posiciones 0,1,2, luego 3,4,5, luego 6,7,8, luego 0,3,6, luego 1,4,7, luego 2,5,8, luego 0,4,8 y luego 2,4,6
      const [a, b, c] = combo
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null
  } 

  const updateBoard = (index) => {
    //Si el tablero en esa posicion ya tiene un valor, no hacemos nada, para evitar que se sobreescriba la 
    // ficha del jugador
    if(board[index]  || winner) return

    //Actualizamos el tablero, para eso usamos la funcion setBoard, que nos permite actualizar el estado del tablero, le pasamos una copia del tablero actualizada con la ficha del jugador en la posicion correspondiente
    //Lo que hace esto es crear una copia del tablero actual, luego actualiza la posicion del tablero 
    // con la ficha del jugador, y luego actualiza el estado del tablero con la nueva copia del tablero,
    //  esto es importante para que React se de cuenta que el estado ha cambiado y vuelva a renderizar
    //  el componente

    //Aca estamos usando el operador spread para crear una copia del tablero actual, 
    // luego actualizamos la posicion del tablero con la ficha del jugador, 
    // y luego actualizamos el estado del tablero con la nueva copia del tablero, 
    // esto es importante para que React se de cuenta que el estado ha cambiado y vuelva a renderizar el
    //  componente
    const newBoard = [...board]
    //Porqueee?? copia del board y no usar directamente?, porque no se debe mutar nunca props ni estado, 
    //tratarlos como si fuecen inmutables, arrays, no tener que modificar valor que tiene, si no siempre crear
    //  una copia del valor que tiene, modificar esa copia y luego actualizar el estado con la nueva copia, 
    // esto es importante para que React se de cuenta que el estado ha cambiado y vuelva a renderizar 
    // el componente
    
    newBoard[index] = turn //x u o
    setBoard(newBoard)

    //Cambiar el turno del jugador, si es turno X, el siguiente turno es O, y viceversa
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //10. revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      //!!!Actualizacion de estados en react son asincronos, entonces si queremos mostrar el ganador en un alert, debemos hacerlo antes de actualizar el estado del ganador, para que el alert muestre el ganador correcto, y luego actualizar el estado del ganador para que se muestre en la interfaz
      // alert(`El ganador es ${newWinner}`)
      // setWinner(newWinner)
      //Cuando actualizamos estado, podemos pasarle nuevo valor o pasarle un callback, igual es asincrono, pero el callback recibe el valor anterior del estado, entonces podemos usar ese valor para mostrar el ganador anterior y el nuevo ganador, esto es util para mostrar un mensaje como "El ganador es X y el ganador anterior era O"
      // setWinner((previousWinner) => {
      //   console.log(`El ganador es ${newWinner} y el ganador anterior era ${previousWinner}`)
      //   return newWinner
      // })
      setWinner(newWinner)
    }
  }

  return (
    //1. Renderizamos el tablero
    <main className="board">
      <h1>Tic tac toe</h1>

      <section className="game">
        {
          //Como no me interesa el valor del tablero, sino el indice, puedo usar un guion bajo para indicar que no me interesa ese valor, y luego usar el index para saber en que posicion del tablero estoy
          //Array primer parametro es el valor del tablero (elemento), el segundo parametro es el indice del tablero, el tercer parametro es el array completo del tablero
          
          //3. Renderizamos cada casilla del tablero, para eso usamos el componente Square, le pasamos el index del tablero como prop, y el valor de la casilla como children, que es lo que va a tener dentro del cuadradito (x o o)
            //Lista elementos se renderiza .map, porque devuelve un array de elementos, en este caso cada casilla del tablero,
            //  el index es el indice del tablero, que se utiliza para saber en que posicion del tablero se encuentra 
            // la ficha del jugador, y el valor del tablero es el valor de la casilla (x o o), pero como no me interesa
            //  el valor del tablero, puedo usar un guion bajo para indicar que no me interesa ese valor
          board.map((_,index) => {
            return (<div key={index} className="cell">
              {/* //Para renderizar lista de elementos, necesitamos una key (indentificador unico) para cada elemento, 
              en este caso el index del tablero es un buen identificador unico, ya que cada casilla del tablero tiene 
              un indice unico */}
              <Square key={index}
                index={index} /*7. vamos a pasarle una funcion al componente,
                 pasamos la funcion no la ejecucion, para ejecutarlo cuando queramos  */ updateBoard={updateBoard}>
                {board[index]}
              </Square>        
            </div>
          )
          })
        }
      </section>

      {/* //6.Ahora queremos mostrar el turno del jugador, para eso vamos a crear un componente
       que muestre el turno del jugador, y lo vamos a renderizar debajo del tablero */}
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>


    </main>
   
  )
}

export default App
