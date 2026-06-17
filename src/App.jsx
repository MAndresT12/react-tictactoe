import "./App.css";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Board } from "./components/Board.jsx";
import { TurnIndicator } from "./components/TurnIndicator.jsx";
import { useGame } from "./hooks/useGame.js";
function App() {
  const { board, turn, winner, updateBoard, resetGame } = useGame();
  //useState que al cambiar vuelve a renderizar componente para reflejar los cambios
  //useEffect hook que permite ejecutar codigo arbitrario cuando componente se monta en el dom, y cada vez que cambian las dependencias que nosotros le digamos
  // useEffect(() => {
  //   console.log('El ganador es: ', winner)
  // }, [winner]) //dependencia, cada vez que board cambie, se ejecutara el codigo dentro del useEffect
  //ejemplo tenemos un winner y queremos enviar a bdd o a una api, cada vez que winner cambie, se ejecutara el codigo dentro del useEffect, y podemos enviar el ganador a la bdd o a la api

  return (
    //1. Renderizamos el tablero
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <Board board={board} updateBoard={updateBoard} />

      <TurnIndicator turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
