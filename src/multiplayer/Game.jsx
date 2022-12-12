import React, { useState, useEffect } from 'react';
import Board from '../components/Board.jsx';
import {
    generateRandomBoard,
    generatePossibleWords,
} from '../backend/utils.js';
import '../styles/board.css';

let dictionary = [];
fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
)
    .then((response) => response.json())
    .then((data) => {
        for (var key in data) {
            dictionary.push(key);
        }
    });
import React, { useState, useEffect } from 'react';
import Board from '../components/Board.jsx';
import {
    generateRandomBoard,
    generatePossibleWords,
} from '../backend/utils.js';
import '../styles/board.css';

let dictionary = [];
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
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <h1>Boggle</h1>
                <h2>Possible Words: {possibleWords.length}</h2>
                <Board boardSize={boardSize} board={randomBoard} />

                <div id="word-submit">
                    <span><strong>Current Word:</strong> ABC</span>
                    <button type="button">Submit Word</button>
                </div>

                {/*<button onClick={handleNewBoard}>New Board</button>*/}
                {/*<br></br>*/}
                {/*<button onClick={handleStart}>Start game</button>*/}
                {/*<br></br>*/}

            </div>
            {/*<div style={{ margin: 'right', textAlign: 'right' }}>*/}
            {/*    <button onClick={handleShow}>Show words</button>*/}
            {/*    {showWords ? (*/}
            {/*        <div>*/}
            {/*            {possibleWords.map((word) => {*/}
            {/*                return <div>{word}</div>;*/}
            {/*            })}*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <></>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
}

export default function Game() {
    const boardSize = 4;
    const [randomBoard, setRandomBoard] = useState([[]]);
    const [possibleWords, setPossibleWords] = useState([]);
    const [showWords, setShowWords] = useState(false);

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
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <h1>Boggle</h1>
                <h2>Possible Words: {possibleWords.length}</h2>
                <Board boardSize={boardSize} board={randomBoard} />

                <div id="word-submit">
                    <span><strong>Current Word:</strong> ABC</span>
                    <button type="button">Submit Word</button>
                </div>

                {/*<button onClick={handleNewBoard}>New Board</button>*/}
                {/*<br></br>*/}
                {/*<button onClick={handleStart}>Start game</button>*/}
                {/*<br></br>*/}

            </div>
            {/*<div style={{ margin: 'right', textAlign: 'right' }}>*/}
            {/*    <button onClick={handleShow}>Show words</button>*/}
            {/*    {showWords ? (*/}
            {/*        <div>*/}
            {/*            {possibleWords.map((word) => {*/}
            {/*                return <div>{word}</div>;*/}
            {/*            })}*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <></>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
}
