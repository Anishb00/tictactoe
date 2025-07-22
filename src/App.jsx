import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Tile from './components/tile.tsx'
import './App.css'

function App() {
  const [turn, setTurn] = useState(true)
  const [board,setBoard] = useState([[null,null,null],
                                     [null,null,null],
                                     [null,null,null]])
  const [winner,setWinner] = useState(false);

  function changeTurn(row,col){
    var boardrep = board
    boardrep[row][col] = turn? 'x':'o' ;
    setBoard(boardrep);

    if(checkwinner(row,col)){
      setWinner(true);
    }else{
      setTurn(!turn);
    }
  }

  function checkwinner(row,col){
    var check = true
    for(let i = 0; i < 3; i++){
      if(board[row][i] != board[row][col]){
        check = false
      }
    }
    if(check){
      return check;
    }
    check = true
    for(let i = 0; i < 3; i++){
      if(board[i][col] != board[row][col]){
        check = false;
      }
    }
    if(check){
      return check;
    }
    check = true
    for(let i = 0; i < 3; i++){
      if(board[i][i] != board[row][col]){
        check = false;
      }
    }
    if(check){

      return check;
    }
    check = true
    for(let i = 0; i < 3; i++){
      if(board[i][2-i] != board[row][col]){
        check = false;
      }
    }
    if(check){
      return check;
    }
    
    return false;
  }

  var rows = [];
  
  for(let i = 0; i < 3; i ++){
    var row = []
    for(let j = 0; j < 3; j ++){
      row.push(<Tile changeTurn={changeTurn} turn={turn} row = {i} col = {j}/>)
    }
    rows.push(row);
  }

  return( 
    <div>
      <div style={{padding:10}}>Turn:{turn? "X" : "O"}</div>
      {rows.map((cols)=><div>{cols}</div>)}
      {winner?<div>Winner is: {turn? "X" : "O"}</div>:null}
    </div>
  )
  
}

export default App
