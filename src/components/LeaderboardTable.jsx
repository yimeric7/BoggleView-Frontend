import LeaderboardRow from "./LeaderboardRow.jsx";
import React, { useEffect, useState } from "react";

// const testData = [
//     {
//         "userName": "Eric",
//         "matchScore": 25
//     },
//     {
//         "userName": "Test",
//         "matchScore": 15
//     },
//     {
//         "userName": "Avery",
//         "matchScore": 14
//     },
//     {
//         "userName": "James",
//         "matchScore": 13
//     },
//     {
//         "userName": "Thomas",
//         "matchScore": 12
//     },
//     {
//         "userName": "Percy",
//         "matchScore": 12
//     },
//     {
//         "userName": "Taqir",
//         "matchScore": 12
//     },
//     {
//         "userName": "Bianca",
//         "matchScore": 11
//     },
//     {
//         "userName": "Aaron",
//         "matchScore": 10
//     },
//     {
//         "userName": "Kevin",
//         "matchScore": 9
//     }
// ]

export default function LeaderboardTable( props ) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // setData(testData)
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




