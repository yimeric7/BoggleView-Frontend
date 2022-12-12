import '../styles/MultiplayerSelectMode.css'
import React from 'react'
import { useNavigate } from 'react-router';
import LogoutButton from "../components/LogoutButton.jsx";
import { useAuth } from "../backend/AuthContext.jsx";
import { Tutorial } from "../components/Tutorial.jsx";


export default function SinglePlayerWait() {
    const { setGame } = useAuth()
    const nav = useNavigate();

    async function handleUntimed() {
        try {
            await setGame('untimed')
            nav('/select-board')
        } catch {
            console.log('error')
        }
    }

    async function handleTimed() {
        try {
            await setGame('timed')
            nav('/select-board')
        } catch {
            console.log('error')
        }
    }

    return (
        <div >
            <Tutorial />
            <LogoutButton />
            <div style={{ position: 'absolute', top: '33%', left: '52%', transform: 'translate(-50%, -50%)'}}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Select Mode</strong>
                </div>
            </div>
            <div >
                <div style={{ position: 'absolute', top: '47%', left: '43%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '30px' }} onClick={handleTimed}>Timed</button>
                </div>

                <div style={{ position: 'absolute', top: '47%', left: '60%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '30px' }} onClick={handleUntimed}>Untimed</button>
                </div>
            </div>
        </div>
    )
}