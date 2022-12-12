import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from "../backend/AuthContext.jsx";

export default function SelectBoardScreen() {
    const { setBoard, gameMode } = useAuth();
    const nav = useNavigate();
    const [currentMode, setCurrentMode] = useState('');
    const [alignPercent, setAlignPercent] = useState('');

    async function handleThreeByThree() {
        try {
            await setBoard(3)
            nav('/'+gameMode)
        } catch {
            console.log('error')
        }
    }

    async function handleFourByFour() {
        try {
            await setBoard(4)
            nav('/'+gameMode)
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
        if (gameMode === 'timed') {
            setCurrentMode("Boggle Timed");
            setAlignPercent("41%");
        } else {
            setCurrentMode("Boggle Untimed");
            setAlignPercent('40%');
        }
    }, [gameMode])

    return (
        <div>
            <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}><button onClick={() => nav('/wait')}>
                Return</button></div>
            <div style={{ position: 'fixed', right: `${alignPercent}`, top: '4%', transform: 'translateY(50%)', fontSize: '40px'}}>
                <strong>{currentMode}</strong></div>
            <div style={{ position: 'absolute', top: '33%', left: '51%', transform: 'translate(-50%, -50%)'}}>
                <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                    <strong>Select board size!</strong>
                </div>
            </div>
            <div >
                <div style={{ position: 'absolute', top: '47%', left: '43%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '30px' }} onClick={handleThreeByThree}>3x3</button>
                </div>

                <div style={{ position: 'absolute', top: '47%', left: '60%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '30px' }} onClick={handleFourByFour}>4x4</button>
                </div>
            </div>
        </div>
    )
}