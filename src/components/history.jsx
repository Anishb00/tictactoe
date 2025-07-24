import { useState } from "react"

function History({nummoves,historyClickHandler}){
    var buttons = []
    for(let i = 0; i < nummoves; i++){
        buttons.push(<button key = {i} value = {i+1} onClick={historyClickHandler}>move {i+1}</button>)
    }

    return(
        <div className="historylayout">
            <button value="0" onClick={historyClickHandler}>Go To game Start</button>
            {buttons}
        </div>
    )
}


export default History