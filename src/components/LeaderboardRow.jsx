import React from 'react';

export default function LeaderboardRow(props) {
    return (
        <tr>
            <td>{props.userName}</td>
            <td>{props.matchScore}</td>
        </tr>
    );
}