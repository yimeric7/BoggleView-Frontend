import React, {useEffect, useRef, useState} from "react";

export default function GameTimer({ onEnd, timerStart}) {
    // Change this to minute & second format
    const [remainingTime, setRemainingTime] = useState(60)
    const timerRef = useRef(null);

    useEffect(() => {
        if (timerStart) {
            timerRef.current = setInterval(() => {
                setRemainingTime((state) => state - 1);
            }, 1000); // call function every 1 second
        }

    }, [timerStart])

    useEffect(() => {
        if (remainingTime === 0) {
            onEnd(); // call function to handle end of game
        }
    }, [remainingTime, onEnd]); // only run effect when remainingTime changes

    return (<div>Remaining time: {remainingTime} seconds</div>);
};