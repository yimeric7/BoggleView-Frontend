import React, {useEffect, useState} from 'react';
import Row from './Row'
import { useAuth } from "../backend/AuthContext.jsx";

export default function Board({ boardSize, board }) {
    const [boardId, setBoardId] = useState("");
    useEffect(() => {
        console.log(boardSize);
        if (boardSize === 3) {
            setBoardId("board3");
        } else if (boardSize === 4)
            setBoardId("board4");
    }, [boardSize])

    return (
        <div id={boardId}>
            {board.map(board => { return <Row boardRow = {board}/> })}
        </div>
    );
}
