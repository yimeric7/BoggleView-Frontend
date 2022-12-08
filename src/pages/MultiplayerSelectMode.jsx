import '../styles/MultiplayerSelectMode.css'
import { Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';


export default function MultiplayerSelectMode() {
    const nav = useNavigate();

    return (
        <div id="mutiplayer-select-mode-parent">
            <div>
                <h1>Select Multiplayer Mode</h1>
                <h2>Do you want to join an existing game or host a new game?</h2>
            </div>
            <div id="mutiplayer-select-mode-section">
                <button className="select-host-join-buttons" id="select-join" onClick={() => nav('/multiplayer-join')}>Join</button>
                <button className="select-host-join-buttons" id="select-host" onClick={() => nav('/multiplayer-host')}>Host</button>
            </div>
        </div>
    )
}