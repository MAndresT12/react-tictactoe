import {EMPTY_BOARD} from '../../constants'
import { TURNS } from "../../constants"

export const saveGameToStorage = ({board, turn}) => {
  window.localStorage.setItem('board', JSON.stringify(board))  
  window.localStorage.setItem('turn', turn)
}   


export const resetGameToStorage = () => {

    window.localStorage.removeItem('board')
      window.localStorage.removeItem('turn')
}   