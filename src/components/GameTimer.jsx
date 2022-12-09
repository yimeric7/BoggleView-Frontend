import React, {useEffect, useRef, useState} from "react";

export default function GameTimer({ onEnd, timerStart}) {
    // Change this to minute & second format
    const [remainingTime, setRemainingTime] = useState(5)
    const timerRef = useRef(null);

    useEffect(() => {
        if (timerStart) {
            setRemainingTime(() => 5)
            timerRef.current = setInterval(() => {
                setRemainingTime((state) => state - 1);
            }, 1000); // call function every 1 second
        }
    }, [timerStart])

    useEffect(() => {
        if (remainingTime === 0) {
            clearInterval(timerRef.current);
            onEnd(); // call function to handle end of game
        }
    }, [remainingTime, onEnd]); // only run effect when remainingTime changes

    const getSeconds = () => {
        let second = Math.floor(remainingTime % 60).toString();
        second = (second.length === 1) ? '0' + second : second;
        return second;
    }

    const getMinutes = () => {
        let minutes = Math.floor(remainingTime / 60).toString();
        minutes = (minutes.length === 1) ? '0' + minutes : minutes;
        return minutes;
    }

    return (<div>Remaining time: {getMinutes()}:{getSeconds()} </div>);
};