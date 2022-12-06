import React from 'react';
import Game from './pages/Game.jsx';
import Home from './pages/Home.jsx';
import MultiplayerHost from './pages/MultiplayerHost.jsx';
import MultiplayerJoin from './pages/MultiplayerJoin.jsx';
import MultiplayerSelectMode from './pages/MultiplayerSelectMode.jsx';
import './styles/board.css';
import { Route, Routes } from "react-router";

export default function App() {
    return (

        <Routes>
            <Route path="/" element={
                <div id="home-container">
                    <Home />
                </div>} />
            <Route path="/multiplayer-host" element={
                <div id="multiplayer-host-container">
                    <MultiplayerHost />
                </div>} />
            <Route path="/multiplayer-join" element={
                <div id="multiplayer-join-container">
                    <MultiplayerJoin />
                </div>} />
            <Route path="/multiplayer-select-mode" element={
                <div id="multiplayer-select-mode-container">
                    <MultiplayerSelectMode/>
                </div>} />
            <Route path="/game" element={
                <div id="boggle-container">
                    <Game />
                </div>
            } />
        </Routes>

    );
}

/*
    TODO:   Add routes to buttons on home and multiplayer select mode
            Verify input on all screens
            Add multiplayer waiting screen
*/