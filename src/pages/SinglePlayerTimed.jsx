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
import { useAuth } from "../backend/AuthContext.jsx";
import { TutorialWhilePlaying } from "../components/TutorialWhilePlaying.jsx";
import LeaderboardTable from '../components/LeaderboardTable.jsx'
import '../styles/board.css'
import '../styles/Leaderboard.css';

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

export default function SinglePlayerTimed() {
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
    const [endPhrase, setEndPhrase] = useState('');
    const [nameEntered, setNameEntered] = useState(false);
    const [leaderboardClosed, setLeaderboardClosed] = useState(false);
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
                setPhrase("Valid Word!");
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

    const handleEndKeyDown = event => {
        if (event.key === 'Enter' || event.key === 'Return') {
            setInput('');
            setEndPhrase("Thanks for playing!");
            setNameEntered(true);
            fetch("http://localhost:5272/api/AddNewPlayer", {
                method: 'POST',
                body: JSON.stringify({
                    userName: `${input}`,
                    matchScore: `${currentScore}`
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const handleClose = () => {
        setLeaderboardClosed(true);
    }

    return (
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ position: 'fixed', left: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}><button style={{ pointerEvents: 'none' }}>
                        <GameTimer onEnd={handleGameEnd} timerStart={gameStart} /></button></div>
                    <div style={{ position: 'fixed', right: '38%', top: '0%', fontSize: '40px'}}>
                        <button style={{ pointerEvents: 'none' }}><strong>Boggle Timed</strong></button></div>
                    <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}><button onClick={() => nav('/wait')}>Return</button></div>
                </div>
                <br /><br />

                {!gameStartedOnce ? (
                    <>
                        <div style={{ position: 'fixed', right: '50%', top: '25%', transform: 'translate(50%, 50%)', fontSize: '85px' }}>
                            <button onClick={handleGameStart}>Start Game!</button></div>
                        <TutorialWhilePlaying />
                    </>
                ) : (<></>)}

                {gameStart ? (
                    <div>
                        <TutorialWhilePlaying />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ margin: 'auto', marginTop: '6%' }}>
                                <Board boardSize={boardSize} board={randomBoard} />
                            </div>
                            <div style={{ marginTop : '6%', position: 'absolute', right: '18%', borderRadius: '35px' }}>
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
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto',
                            fontSize: '75px', lineHeight: '75px', flexDirection: 'row', marginTop: '3%', flexWrap: 'wrap'}}>
                            <strong>Game Ended!</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto',
                            fontSize: '60px', lineHeight: '60px', flexDirection: 'row', marginTop: '1%', flexWrap: 'wrap'}}>
                            Final Score: {currentScore}
                        </div>
                        {!leaderboardClosed ? (<div style={{display: 'flex', justifyContent: 'center', margin: 'auto', marginRight: '27%', marginTop: '2%',
                            position: 'relative'}}>
                            <div style={{position: 'absolute', top: '1%', right: '13%', zIndex: '1'}}>
                                <button className="close-button" onClick={handleClose}>
                                    <span className="close-button__line close-button__line--top"><strong>X</strong></span>
                                </button>
                            </div>
                            <div style={{position: 'absolute', right: '51%', zIndex: '-1'}}>
                                <LeaderboardTable />
                            </div>
                        </div>) : (<></>)}
                    </div>
                ) : (<></>)}

                {leaderboardClosed ? (
                    <div>
                        {!nameEntered ? (
                        <div>
                            <div style={{fontSize: '35px', lineHeight: '35px', marginTop: '5%', fontWeight: 'bold'}}>
                                Enter Name
                            </div>
                            <span id="word-submit">
                            <input type="text"
                                   onChange={handleChange}
                                   onKeyDown={handleEndKeyDown}
                                   value={input} />
                            </span>
                        </div>
                        ) : (<div style={{display: 'flex', justifyContent: 'center'}}>
                            <div style={{fontSize: '50px', lineHeight: '65px', marginTop: '5%'}}><strong>{endPhrase}</strong>
                                <br/>
                                <div style={{fontSize: '20px', lineHeight: '20px', width: '75%', marginLeft: '13%'}}>
                                    If you scored within the top 10, you will be added to the leaderboard!
                                </div>
                            </div>
                        </div>)}
                    </div>
                ) : (<></>)}
            </div>
        </>
    );
}
