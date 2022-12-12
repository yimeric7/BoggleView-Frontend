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
        fetch("http://localhost:5272/api/GetTop10LeaderBoard")
            .then((response) => response.json())
            .then((data) => {
                console.log('data' + data)
                setData(data)
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <table id="table">
            <tr style={{width: '100%', textAlign: 'center', fontWeight: 'bold'}}>
                <td colSpan="2" style={{fontSize: '40px'}}>Leaderboard</td>
            </tr>
            <tr style={{fontWeight: 'bold', fontSize: '20px'}}>
                <td>Name</td>
                <td>Score</td>
            </tr>
            {data.map((player) => (
                <LeaderboardRow userName={player.userName} matchScore={player.matchScore} />
            ))}
        </table>
    );
}




