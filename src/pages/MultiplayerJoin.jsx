import { Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import '../styles/MultiplayerJoin.css'

export default function MultiplayerJoin() {
    const [input, setInput] = useState();
    const nav = useNavigate();


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

    return (
        <div id="join-parent">
            <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}> <button onClick={() => nav('/')}> Return home </button></div>
            <div style={{ position: 'absolute', top: '33%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Join Hosted Game</strong>
                </div>
                <br />
                <div style={{ fontSize: '40px', lineHeight: '50px' }}>
                    Enter a port and address:
                </div>
            </div>
            <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '30px', width:'100%' }}>
                <br /><br /><br />
                <span id="join-port-section">
                    <input type="text" id="join-select-port-text" onChange={handleChange} value={input} placeholder="Port..."/>
                    <input type="text" id="join-select-address-text" onChange={handleChange} value={input} placeholder="Address..."/>
                    <button id="join-submit" onClick={handleClick}>Submit</button>
                </span>
            </div>
        </div>
    )
}