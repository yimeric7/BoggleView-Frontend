import React from 'react';
import Game from './pages/Game';
import './styles/board.css';
import { Route, Routes } from "react-router";
import MultiplayerHost from "./pages/MultiplayerHost.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={ <MultiplayerHost/> }/>
            <Route path="/game" element={
                <div id="boggle-container">
                    <Game />
                </div>
            }/>
        </Routes>
    );
}