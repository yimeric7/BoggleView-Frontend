import { Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'

export default function MultiplayerJoin() {
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
        <div id="join-parent">
            <div>
                <h1>Join Hosted Game</h1>
                <h2>Enter a port and address:</h2>
                <p>(todo:  add function to verify valid input range to be 0-65353 and validate address)</p>
            </div>
            <span id="join-port-section">

                <input type="text" id="join-select-port-text" onChange={handleChange} value={input}/>
                <input type="text" id="join-select-address-text" onChange={handleChange} value={input}/>
                <button id="join-submit" onClick={handleClick}>Submit</button>

            </span>
        </div>
    )
}