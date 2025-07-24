import { useState } from "react";
import "./tile.css";

function Tile({changeTurn,row,col,val}){

    
    function handleTileClick(){
        changeTurn(row,col);
    }

    return(
        <button onClick={handleTileClick} className="tile" disabled={val!=null}>
            {val}
        </button>
    )
}

export default Tile