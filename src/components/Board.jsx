import React from 'react';
import Row from './Row'

export default function Board({ boardSize, board }) {
    return (
        <div id="board">
            {board.map(board => { return <Row boardRow = {board}/> })}
        </div>
    );
}
