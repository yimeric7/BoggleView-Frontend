import { Alert, AlertTitle } from '@mui/material'
import '../styles/MultiplayerWait.css'
import React, { useState } from 'react'

let playersReady = [false, false, false, false];

export default function MultiplayerWait() {
    const [input, setInput] = useState()

    const handleChange = event => {
        setInput(event.target.value);
        console.log('value is:', event.target.value);
    }

    const handleClick = () => {
        // if input is not within range, then throw error
        // just check if textInput is valid
        console.log("click")
        console.log(input)
    }

    return(
        <div id="wait-parent">
            <div id="player-status-list">
                <span id="player1-status">Player 1  </span><br/>
                <span id="player2-status">Player 2  </span><br/>
                <span id="player3-status">Player 3  </span><br/>
                <span id="player4-status">Player 4  </span><br/>  
            </div>
            <div id="ready-button">
                <button id="ready-up" onClick={handleClick}>Ready</button>
            </div>
        </div>
    )
}

// Returns the correct SVG image based on whether the player is ready or not
// Needs to be re-run for each player when a player clicks ready up?
// use: import CheckBoxIcon from '@mui/icons-material/CheckBox';
// and  import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
function isReady(player){
    if(playersReady[player]){
        
    }
    else{

    }
}