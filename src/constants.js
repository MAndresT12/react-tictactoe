//1. CONSTANTES TURNS, enum
export const TURNS = {
  X: '❌',
  O: '⚪'
}

//9. CONSTANTES WINNER_COMBOS podriamos tener winner_combos, y tener combinaciones ganadoras, pero no es optima
export const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
export const EMPTY_BOARD = Array(9).fill(null)