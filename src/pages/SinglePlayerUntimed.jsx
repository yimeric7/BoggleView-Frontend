import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import {
    generateRandomBoard,
    generatePossibleWords,
    convertWordsToMap,
} from '../backend/utils.js';
import '../styles/board.css';
import { useNavigate } from "react-router";
import { useAuth } from "../backend/AuthContext.jsx";
import { TutorialWhilePlaying } from "../components/TutorialWhilePlaying";

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

export default function SinglePlayerUntimed( ) {
    const { givenBoardSize } = useAuth();
    const boardSize = givenBoardSize;
    const [input, setInput] = useState()
    const [randomBoard, setRandomBoard] = useState([[]]);
    const [possibleWords, setPossibleWords] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [usedWords, setUsedWords] = useState(new Set());
    const [gameStart, setGameStart] = useState(false);
    const [gameStartedOnce, setGameStartedOnce] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [phrase, setPhrase] = useState('');
    const [wordsMissed, setWordsMissed] = useState([]);
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
                setPhrase('Valid Word!')
            } else if (possibleWords.has(read) && usedWords.has(read)) {
                setPhrase('Already Used!');
            } else {
                setPhrase('NOT A WORD');
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
        setGameStart(false);
        setGameEnd(true);
    }

    useEffect(() => {
        // Create wordsMissed
        let wordsMissedArr = [];
        const keys = possibleWords.keys();
        for (const keys of possibleWords) {
            if (!usedWords.has(keys[0])) {
                const wordMissed = {
                    word: keys[0],
                    score: possibleWords.get(keys[0])
                }
                wordsMissedArr.push(wordMissed);
            }
        }
        setWordsMissed(wordsMissedArr);
    }, [gameEnd])

    return (
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ position: 'fixed', right: '40%', top: '4%', transform: 'translateY(50%)', fontSize: '40px'}}>
                        <strong>Boggle Untimed</strong></div>
                    <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}><button onClick={() => nav('/wait')}>Return</button></div>
                </div>
                <br></br>
                {!gameStartedOnce ? (
                    <>
                        <div style={{ position: 'fixed', right: '50%', top: '25%', transform: 'translate(50%, 50%)', fontSize: '85px' }}>
                            <button onClick={handleGameStart}>Start Game!</button></div>
                        <TutorialWhilePlaying />
                    </>
                ) : (<></>)}

                {gameStart ? (
                    <div>
                        <div style={{ position: 'fixed', left: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}>
                            <button onClick={handleGameEnd}>End Game!</button>
                        </div>
                        <TutorialWhilePlaying />
                        <h2>{foundWords.length} / {possibleWords.size} Words Found</h2>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ margin: 'auto', top: '10%' }}>
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
                        <div style={{fontSize: '30px'}}><strong>{phrase}</strong></div>
                    </div>
                ) : (<></>)}

                {gameEnd ? (
                    <div>
                        <div style={{ position: 'fixed', left: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}>
                            <button onClick={handleGameEnd}>End Game!</button>
                        </div>
                        <div>
                            These are the words you missed!
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <table id="show-table">
                                        <tr>
                                            <th>Word </th>
                                            <th>Score</th>
                                        </tr>
                                        {wordsMissed.map(obj => {
                                            return (
                                                <tr>
                                                    <td>{obj.word}</td>
                                                    <td>{obj.score}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </>
    );
}
