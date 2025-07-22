import { useState } from "react";
import "./tile.css";

function Tile({changeTurn,turn,row,col}){
    const [val, setval] = useState("");

    function handleTileClick(){
        if(turn){
            setval('X');
        }else{
            setval('O');
        }
        changeTurn(row,col);
    }

    return(
        <button onClick={handleTileClick} className="tile" disabled={val!=""}>
            {val}
        </button>
    )
}

export default Tile