import LeaderboardRow from "./LeaderboardRow.jsx";
import React, { useEffect, useState } from "react";

export default function LeaderboardTable( props ) {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('rendering')
        fetch("https://5e3f-167-248-126-71.ngrok.io/api/GetTop10LeaderBoard")
            .then((response) => response.json())
            .then((data) => {
                console.log('data' + data)
                setData(data)
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {data.map((player) => (
                <LeaderboardRow userName={player.userName} matchScore={player.matchScore} />
            ))}
            </tbody>
        </table>
    );
}




