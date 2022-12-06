import React from 'react';
import MultiplayerHost from './pages/MultiplayerHost.jsx';
import MultiplayerJoin from './pages/MultiplayerJoin.jsx';
import MultiplayerSelectMode from './pages/MultiplayerSelectMode.jsx';
import './styles/board.css';
import { Route, Routes } from "react-router";
import SinglePlayer from "./pages/Singleplayer.jsx"
import MainSelectMode from "./pages/MainSelectMode";

export default function App() {
    return (

        <Routes>
            <Route path="/" element={
                <div id="home-container">
                    <MainSelectMode />
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
            <Route path="/single-player" element={
                <div id="boggle-container">
                    <SinglePlayer />
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