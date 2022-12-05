import React from 'react';
import Letter from './Letter';
import '../styles/board.css';

export default function Board({ boardRow }) {
    return (
        <div class="row">
            {boardRow.map(board => {
                return <Letter boardLetter ={board}/>
            })}
        </div>
    );
}