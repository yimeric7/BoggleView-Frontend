import '../styles/MultiplayerSelectMode.css'
import { Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';


export default function MultiplayerSelectMode() {
    const nav = useNavigate();

    return (
        <div id="mutiplayer-select-mode-parent">
            <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}> <button onClick={() => nav('/')}> Return home </button></div>
            <div style={{ position: 'absolute', top: '33%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%'}}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Select Multiplayer Mode</strong>
                </div>
                <br/>
                <div style={{ fontSize: '40px', lineHeight: '50px'}}>
                    Do you want to join an existing game or host a new game?
                </div>
            </div>
            <div id="mutiplayer-select-mode-section">
                <div style={{ position: 'absolute', top: '45%', left: '37%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '30px' }} className="select-host-join-buttons" id="select-join" onClick={() => nav('/multiplayer-join')}>Join</button>
                </div>
                <div style={{ position: 'absolute', top: '45%', left: '62%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '30px' }} className="select-host-join-buttons" id="select-host" onClick={() => nav('/multiplayer-host')}>Host</button>
                </div>
            </div>
        </div>
    )
}