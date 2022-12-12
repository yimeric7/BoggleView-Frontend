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
import axios from "axios";
import { useAuth } from "../backend/AuthContext.jsx";
import { TutorialWhilePlaying } from "../components/TutorialWhilePlaying.jsx";
import LeaderboardTable from '../components/LeaderboardTable.jsx'

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
    const [leaderboard, setLeaderboard] = useState('');
    const [phrase, setPhrase] = useState('');
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
        // try {
        //     fetch('https://5e3f-167-248-126-71.ngrok.io/api/GetTop10LeaderBoard')
        //         .then((response) => {
        //             return response.json()
        //         })
        //         .then((data) => {
        //             // Work with JSON data here
        //             console.log(data)
        //         })
        //         .catch((err) => {
        //             // Do something for an error here
        //         })
        // } catch {
        //     console.log('Get leaderboard failed!')
        // }
    }

    const handleEndKeyDown = () => {
        if (event.key === 'Enter' || event.key === 'Return') {
            console.log(input+currentScore);
            axios.post('https://my-server.com/login', {
                username: 'user123',
                password: 'password456'
            }, (response) => {
                // do something with the response here
            })

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
    {/*// Enter in here to start playing*/}
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
                        <LeaderboardTable />
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto',
                            fontSize: '75px', lineHeight: '75px', flexDirection: 'row', marginTop: '3%', flexWrap: 'wrap'}}>
                            <strong>Game Ended! </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto',
                            fontSize: '60px', lineHeight: '60px', flexDirection: 'row', marginTop: '1%', flexWrap: 'wrap'}}>
                            Final Score: {currentScore}
                        </div>
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
                ) : (<></>)}

            </div>
        </>
    );
}
