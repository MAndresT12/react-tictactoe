//Vamos a crear un juego de tic tac toe, el tablero es de 3x3, cada jugador tiene un turno para colocar su ficha, el primero en colocar 3 fichas en linea gana, si se llenan las casillas sin que nadie gane, es un empate
//Square
//children lo que va a tener dentro del tablero la x o la o, el index del tablero, el turno del jugador, la funcion para actualizar el tablero, la funcion para cambiar el turno
// updateBoard es la funcion para actualizar el tablero, recibe el index del tablero y el turno del jugador, luego actualiza el tablero con la ficha del jugador en la posicion correspondiente
// index (para saber ese cuadradito que indice es) es el index del tablero, se utiliza para saber en que posicion del tablero se encuentra la ficha del jugador
export const  Square = ({children, updateBoard, index, isSelected}) => {
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

