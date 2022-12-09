import React from 'react';
import { useNavigate } from 'react-router';

export default function MainSelectMode() {
    const nav = useNavigate();

    return (
        // display Boggle Logo
        <div id="main-select-mode-parent">
            <div style={{ position: 'absolute', top: '33%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Welcome to Boggle!</strong>
                </div>
                <br />
                <div style={{ fontSize: '40px', lineHeight: '50px' }}>
                    Select a gamemode
                </div>
            </div>
            <div style={{ position: 'absolute', top: '45%', left: '37%', transform: 'translate(-50%, -50%)' }}>
                <br /><br/><br/>
                <button style={{ fontSize: '30px' }} onClick={() => nav('/single-player')}>Single Player</button>
            </div>
            <div style={{ position: 'absolute', top: '45%', left: '62%', transform: 'translate(-50%, -50%)' }}>
                <br /><br/><br/>
                <button style={{ fontSize: '30px' }} onClick={() => nav('/multiplayer-select-mode')}>Multiplayer</button>
            </div>
        </div>
    )
}
