import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import {
    generateRandomBoard,
    generatePossibleWords,
    convertWordsToMap,
} from '../backend/utils.js';
import '../styles/board.css';
import { useNavigate } from "react-router";

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
        if (event.key === 'Enter') {
            // Check if word is correct, if correct, then add word to scoretable
            if (possibleWords.has(input) && !usedWords.has(input)) {
                const newWordFound = {
                    word: input,
                    score: possibleWords.get(input)
                }
                setFoundWords([...foundWords, newWordFound])
                setUsedWords(new Set([...usedWords, input]));
                setInput('');
            } else {
                // throw error and say not word
                console.log("not a word");
            }

        }
    }

    const handleClick = () => {

    }

    return (
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <button onClick={handleClick}>Start Game!</button>
                <button onClick={() => nav('/')}>Return home</button>
                <h1>Boggle</h1>
                <h2>{foundWords.length} / {possibleWords.size} Words Found</h2>
                <Board boardSize={boardSize} board={randomBoard} />

                {/*// Enter in here to start playing*/}
                {/*// on change, update word,*/}
                {/*// if valid word, then you get points (or pop up that says "some prhases (randomized))*/}
                {/*// if invalid, alert that says invalid word, please try again*/}
                {/*// score box that shows points*/}
                {/*// also show how many words you've gotten out of possible*/}
                {/*// put word score on right (css)*/}
                <span id="word-submit">
                    <input type="text"
                           onChange={handleChange}
                           onKeyDown={handleKeyDown}
                           value={input}/>
                </span>

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
        </>
    );
}
