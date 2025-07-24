import { useState, useEffect } from 'react'
import Tile from './tile.tsx'
import History from './history.jsx';
import '../App.css'

function Board(){
  const [turn, setTurn] = useState(true)
  const [board,setBoard] = useState([[null,null,null],
                                     [null,null,null],
                                     [null,null,null]])
  const [winner,setWinner] = useState(false);
  const [tiles,setTiles] = useState([]);
  const [history,setHistory] = useState([]);
  const [startGame, setStartGame] = useState(false);

  function changeTurn(row, col){
    const boardrep = board.map(row => [...row]); // deep copy
    boardrep[row][col] = turn ? 'X' : 'O';
    setBoard(boardrep);


    if(checkwinner(boardrep,row,col)){
      setWinner(true);
    }else{
      setTurn(!turn);
    }
    setHistory(history.concat([`${row} ${col} ${turn? "X" : "O"}`]))
  }



  function checkwinner(board,row,col){

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

  function revertHistory(e){
    var revertedboard = [[null,null,null],
                        [null,null,null],
                        [null,null,null]]
    var revertedhistory = [...history].slice(0,e.target.value)
    setHistory(revertedhistory);
    for(let i = 0; i < revertedhistory.length; i++){
      let split = revertedhistory[i].split(" ")
      let row = split[0]
      let col = split[1]
      let tileval = split[2]

      revertedboard[row][col] = tileval;


    }
    setBoard(revertedboard);
    setWinner(false);

  }
  


//updates rendered board to reflect board state of 
  useEffect(() => {
    var rows = [];
    for(let i = 0; i < 3; i ++){
      var row = []
      for(let j = 0; j < 3; j ++){
        row.push(<Tile key={(i)*3+j+1} changeTurn={changeTurn} turn={turn} row = {i} col= {j}  disabled = {startGame} val = {board[i][j]}/>)
      }
      rows.push(row)
    }
    setTiles(rows);
  }, [board])

  return( 
    <div className='boardlayout'>
      <div style={{padding:10}}>
        <div style={{padding:10}}>Turn:{turn? "X" : "O"}</div>
        {tiles.map((cols,index)=><div key={index}>{cols}</div>)}
        {winner?<div>Winner is: {turn? "X" : "O"}</div>:null}
      </div>
      <div>
        <History nummoves={history.length} historyClickHandler={revertHistory}/>
      </div>
    </div>
    
  )
}

export default Board;