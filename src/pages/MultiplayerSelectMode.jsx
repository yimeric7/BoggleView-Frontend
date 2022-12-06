import '../styles/MultiplayerSelectMode.css'
import { Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'


function MultiplayerSelectMode() {
    return (
        <div id="mutiplayer-select-mode-parent">
            <div>
                <h1>Select Multiplayer Mode</h1>
                <h2>Do you want to join an existing game or host a new game?</h2>
            </div>
            <div id="mutiplayer-select-mode-section">
                <button className="select-host-join-buttons" id="select-join" onClick={() => console.log("join")}>Join</button>
                <button className="select-host-join-buttons" id="select-host" onClick={() => console.log("host")}>Host</button>
            </div>
        </div>
    )
}

export default MultiplayerSelectMode