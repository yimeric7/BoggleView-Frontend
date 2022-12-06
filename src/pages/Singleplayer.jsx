import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import {
    generateRandomBoard,
    generatePossibleWords,
} from '../backend/utils.js';
import '../styles/board.css';
import Row from "../components/Row.jsx";

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
    const [showWords, setShowWords] = useState(false);

    useEffect(() => {
        let tempRandBoard = generateRandomBoard(boardSize);
        setPossibleWords(generatePossibleWords(tempRandBoard, dictionary));
        setRandomBoard(tempRandBoard);
    }, []);

    // Generate new 4x4 matrix of letters & possible words
    const handleNewBoard = () => {
        let tempRandBoard = generateRandomBoard(boardSize);
        setPossibleWords(generatePossibleWords(tempRandBoard, dictionary));
        setRandomBoard(tempRandBoard);
        console.log(possibleWords);
    };

    const handleChange = event => {
        setInput(event.target.value);
        console.log('value is:', event.target.value);
    }

    return (
        <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                {/*// Boggle logo maybe?*/}
                <h2>Possible Words: {possibleWords.length}</h2>
                <Board boardSize={boardSize} board={randomBoard} />

                // Enter in here to start playing
                // on change, update word,
                // if valid word, then you get points (or pop up that says "that is a word!)
                // if invalid, alert that says invalid word, please try again
                // score box that shows points
                // also show how many words you've gotten out of possible
                // put word score on right (css)
                <span id="word-submit">
                    <input type="text" onChange={handleChange} value={input}/>
                </span>

                <table id="score-table">
                    <tr>
                        <th>Word </th>
                        <th>Score</th>
                    </tr>
                    <div>
                        {foundWords.map(words => {
                            return (
                                <tr>
                                    <td>{words}</td>
                                </tr>
                            )
                        })}
                    </div>
                    {/*<div id="board">*/}
                    {/*    {board.map(board => { return <Row boardRow = {board}/> })}*/}
                    {/*</div>*/}

                    <tr>

                        <td>congruent</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>urgent</td>
                        <td>3</td>
                    </tr>
                    <tr id="footer">
                        <td>Total </td>
                        <td>14</td>
                    </tr>
                </table>


            </div>

        </>
    );
}
