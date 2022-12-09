import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import {
    generateRandomBoard,
    generatePossibleWords,
    convertWordsToMap,
} from '../backend/utils.js';
import '../styles/board.css';
import { useNavigate } from "react-router";
import GameTimer from '../components/GameTimer.jsx';

let dictionary = [];
fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
)
    .then((response) => response.json())
    .then((data) => {
        for (let key in data) {
            dictionary.push(key);
        }
    });

export default function SinglePlayer() {
    const boardSize = 4;
    const [input, setInput] = useState()
    const [randomBoard, setRandomBoard] = useState([[]]);
    const [possibleWords, setPossibleWords] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [usedWords, setUsedWords] = useState(new Set());
    const [gameStart, setGameStart] = useState(false);
    const [gameStartedOnce, setGameStartedOnce] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        let tempRandBoard = generateRandomBoard(boardSize);
        setPossibleWords(convertWordsToMap(generatePossibleWords(tempRandBoard, dictionary)));
        setRandomBoard(tempRandBoard);
    }, []);

    useEffect(() => {
        let currScore = 0;
        for (let i = 0; i < foundWords.length; i++) currScore += foundWords[i].score;
        setCurrentScore(currScore);
    }, [foundWords]);

    const handleChange = event => {
        setInput(event.target.value);
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter' || event.key === 'Return') {
            // Check if word is correct, if correct, then add word to scoretable
            let read = input.toLowerCase();
            if (possibleWords.has(read) && !usedWords.has(read)) {
                const newWordFound = {
                    word: read,
                    score: possibleWords.get(read)
                }
                setFoundWords([...foundWords, newWordFound])
                setUsedWords(new Set([...usedWords, read]));
                setInput('');
            } else {
                // throw alert and say not word
                console.log("not a word");
            }

        }
    }

    const handleGameStart = () => {
        if (gameStartedOnce === 0) {
            setGameStart(true);
            setGameStartedOnce((state) => state + 1)
        } else return;
    }

    const handleGameEnd = () => {
        // handle event
        console.log('game ended');
        setGameStart(false);
        setGameEnd(true);
    }

    return (
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ position: 'fixed', left: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}><button style={{ pointerEvents: 'none' }}>
                        <GameTimer onEnd={handleGameEnd} timerStart={gameStart} /></button></div>
                    <div style={{ position: 'fixed', right: '50%', top: '0%', transform: 'translate(50%, 50%)', fontSize: '20px' }}>
                        <button onClick={handleGameStart}>Start Game!</button></div>
                    <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}><button onClick={() => nav('/')}> Return home </button></div>
                </div>
                <br /><br />
                <h2>{foundWords.length} / {possibleWords.size} Words Found</h2>

                {/*{fix CSS for Score board}*/}
                {gameStart ? (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ margin: 'auto' }}>
                                <Board boardSize={boardSize} board={randomBoard} />
                            </div>
                            <div style={{ position: 'absolute', right: '18%', borderRadius: '35px' }}>
                                <table id="score-table">
                                    <tr>
                                        <th>Word </th>
                                        <th>Score</th>
                                    </tr>
                                    {foundWords.map(obj => {
                                        return (
                                            <tr>
                                                <td>{obj.word}</td>
                                                <td>{obj.score}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                    </tr>
                                    <tr id="footer">
                                        <td>Total </td>
                                        <td>{currentScore}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <span id="word-submit">
                        <input type="text"
                               onChange={handleChange}
                               onKeyDown={handleKeyDown}
                               value={input} />
                        </span>
                    </div>
                ) : (<></>)}

                {/*{get these on seperate lines}*/}
                {gameEnd ? (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto',
                        fontSize: '75px', lineHeight: '75px', marginTop: '10%', flexDirection: 'row',
                        flexWrap: 'wrap'}}>
                        <strong>Game Ended! </strong> Final Score: {currentScore}
                    </div>
                ) : (<></>)}


                {/*// Enter in here to start playing*/}

                {/*// if valid word, then you get points (or pop up that says "some prhases (randomized))*/}
                {/*// if invalid, alert that says invalid word, please try again*/}
                {/*// score box that shows points*/}
                {/*// also show how many words you've gotten out of possible*/}
                {/*// put word score on right (css)*/}
            </div>
        </>
    );
}
