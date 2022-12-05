import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import {
    generateRandomBoard,
    generatePossibleWords,
} from '../backend/utils.js';

//fetch mini dictionary (for now; use axios & database later)
var dictionary = [];
fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
)
    .then((response) => response.json())
    .then((data) => {
        for (var key in data) {
            dictionary.push(key);
        }
    });

export default function Game() {
    const boardSize = 4;
    const [randomBoard, setRandomBoard] = useState([[]]);
    const [possibleWords, setPossibleWords] = useState([]);
    const [showWords, setShowWords] = useState(false);

    // Generate 4x4 Board & possible words on LOAD (possible words isn't working on load) ~ not sure how to fix; maybe doesn't appear until start game...?
    useEffect(() => {
        var tempRandBoard = generateRandomBoard(boardSize);
        setPossibleWords(generatePossibleWords(tempRandBoard, dictionary));
        setRandomBoard(tempRandBoard);
    }, []);

    // Generate new 4x4 matrix of letters & possible words
    const handleNewBoard = () => {
        var tempRandBoard = generateRandomBoard(boardSize);
        setPossibleWords(generatePossibleWords(tempRandBoard, dictionary));
        setRandomBoard(tempRandBoard);
        console.log(possibleWords);
    };

    // if game is in session, then possible words appear?
    const handleStart = () => {};

    const handleShow = () => {
        // only available once game ends
        setShowWords(true);
    };

    return (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h1>Game Page</h1>
            <h2>Possible Words: {possibleWords.length}</h2>
            <Board boardSize={boardSize} board={randomBoard} />
            <br></br>
            <button onClick={handleNewBoard}>New Board</button>
            <br></br>
            <button onClick={handleStart}>Start game</button>
            <br></br>
            <button onClick={handleShow}>Show words</button>
            {showWords ? (
                <div>
                    {possibleWords.map((word) => {
                        return <div>{word}</div>;
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
