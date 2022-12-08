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
    const [timer, setTimer] = useState(60);
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
        setGameStart(true);
    }

    const handleGameEnd = () => {
        // handle event
        console.log('game ended')
    }

    return (
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <GameTimer onEnd={handleGameEnd} timerStart={gameStart}/>
                    <button onClick={handleGameStart}>Start Game!</button>
                    <button onClick={() => nav('/')}>Return home</button>
                </div>

                <h2>{foundWords.length} / {possibleWords.size} Words Found</h2>
                    <div>

                    </div>
                {gameStart ? (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{margin: 'auto'}}>
                            <Board boardSize={boardSize} board={randomBoard} />
                        </div>
                        <div style={{position: 'absolute', top: '18%', right: '18%'}}>
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
                ) : (<></>)}

                <span id="word-submit">
                    <input type="text"
                           onChange={handleChange}
                           onKeyDown={handleKeyDown}
                           value={input}/>
                </span>


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
