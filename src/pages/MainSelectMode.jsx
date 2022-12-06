import React from 'react';
import '../styles/MainSelectMode.css';
import { useNavigate } from 'react-router';

export default function MainSelectMode() {
    const nav = useNavigate();

    return (
        // display Boggle Logo
        <div id="select-parent">
            <div>
                <h1>Select Gamemode</h1>
            </div>
            <div id="select-button-section">
                <button className="select-gamemode-buttons" id="select-singleplayer"
                        onClick={() => nav('/game')}>
                    Singleplayer</button>
                <button className="select-gamemode-buttons" id="select-multiplayer" onClick={() => console.log("multiplayer")}>Multiplayer</button>
            </div>
        </div>
    )
}
