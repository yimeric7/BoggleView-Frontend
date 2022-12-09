import { Alert, AlertTitle } from '@mui/material'
import '../styles/MultiplayerHost.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { fontSize } from '@mui/system';

export default function MultiplayerHost() {
    const [input, setInput] = useState()

    const handleChange = event => {
        setInput(event.target.value);
        console.log('value is:', event.target.value);
    }

    const nav = useNavigate();

    const handleClick = () => {
        // if input is not within range, then throw error
        // just check if textInput is valid
        console.log("click")
        console.log(input)
    }
    return (
        <div id="host-parent">
            <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}> <button onClick={() => nav('/')}> Return home </button></div>
            <div style={{ position: 'absolute', top: '33%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Host Game Setup</strong>
                </div>
                <br />
                <div style={{ fontSize: '40px', lineHeight: '50px' }}>
                    Enter a port to host on:
                </div>
            </div>
            <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '30px'}}>
            <br /><br/><br/>
                <span id="host-enter-port-section">
                    <input type="text" id="host-select-port-text" onChange={handleChange} value={input} />
                    <button id="host-select-port-submit" onClick={handleClick}>Submit</button>
                </span>
            </div>
        </div>
    )
}