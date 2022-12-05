import { Alert, AlertTitle } from '@mui/material'
import '../styles/MultiplayerHost.css'
import React, { useState } from 'react'

export default function MultiplayerHost() {
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
    return (
        <div id="host-parent">
            <div>
                <h1>Host Game Setup</h1>
                <h2>Enter a port to host on:</h2>
                <p>(todo:  add function to verify valid input range to be 0-65353)</p>
            </div>
            <span id="host-enter-port-section">

                <input type="text" id="host-select-port-text" onChange={handleChange} value={input}/>
                <button id="host-select-port-submit" onClick={handleClick}>Submit</button>

            </span>
        </div>
    )
}