import React from 'react';
import { useNavigate } from 'react-router';

export default function MainSelectMode() {
    const nav = useNavigate();

    return (
        // display Boggle Logo
        <>
            <div>
                <h1>Select Game mode</h1>
            </div>
            <button className="select-gamemode-buttons" id="select-singleplayer"
                    onClick={() => nav('/single-player')}>
                Single Player</button>
            <button className="select-gamemode-buttons" id="select-multiplayer"
                     onClick={() => nav('/multiplayer-select-mode')}>
                Multiplayer</button>
        </>
    )
}
