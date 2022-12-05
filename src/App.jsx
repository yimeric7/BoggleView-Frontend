import React from 'react';
import Game from './pages/Game';
import './styles/board.css';
import { Route, Routes} from "react-router";

export default function App() {
    return (
        <Routes>
            <Route path="/game" element={
                <div id="boggle-container">
                    <Game />
                </div>
            }/>
        </Routes>
    );
}