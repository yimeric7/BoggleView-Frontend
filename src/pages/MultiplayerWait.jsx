import { Alert, AlertTitle, Grid } from '@mui/material'
import '../styles/MultiplayerWait.css'
import React, { useState } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

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
                <span id="player1-status" className="player-status-line">Player 1  {isReady(1)}</span><br/>
                <span id="player2-status" className="player-status-line">Player 2  {isReady(2)}</span><br/>
                <span id="player3-status" className="player-status-line">Player 3  {isReady(3)}</span><br/>
                <span id="player4-status" className="player-status-line">Player 4  {isReady(4)}</span><br/>  
            </div>
            <div id="ready-button">
                <button id="ready-up" onClick={handleClick}>Ready</button>
            </div>
        </div>
    )
}

// Returns the correct SVG image based on whether the player is ready or not
// May need to connect to backend?
// Switch to state hooks?
function isReady(player){
    if(playersReady[player]){
        return (
            <CheckBoxIcon className="player-ready-icon"/>
        );
    }
    else{
        return (
            <CheckBoxOutlineBlankIcon className="player-ready-icon"/>
        );
    }
}