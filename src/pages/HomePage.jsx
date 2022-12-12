import React from 'react';
import { useNavigate } from 'react-router';

export default function HomePage() {
    const nav = useNavigate();

    return (
        // display Boggle Logo
        <div id="main-select-mode-parent">
            <div style={{ position: 'absolute', top: '33%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Welcome to Boggle</strong>
                </div>
                <br />
                <div style={{ fontSize: '40px', lineHeight: '50px' }}>Login or signup to start playing!</div>
            </div>
            <div style={{ position: 'absolute', top: '45%', left: '40%', transform: 'translate(-50%, -50%)' }}>
                <br /><br/><br/>
                <button style={{ fontSize: '30px' }} onClick={() => nav('/login')}>Login</button>
            </div>
            <div style={{ position: 'absolute', top: '45%', left: '60%', transform: 'translate(-50%, -50%)' }}>
                <br /><br/><br/>
                <button style={{ fontSize: '30px' }} onClick={() => nav('/signup')}>Signup</button>
            </div>
        </div>
    )
}
