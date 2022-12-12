import React, { useState } from 'react';

export const TutorialWhilePlaying = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div style={{ position: 'fixed', left: '5%', bottom: '5%', transform: 'translateY(50%)', fontSize: '20px' }}>
                <button onClick={toggleExpanded}>
                    {isExpanded ? 'Close' : 'Tutorial'}
                </button>
            </div>

            <div style={{ position: 'fixed', left: '3%', top: '2%', transform: 'translateY(50%)'
                , fontSize: '15px', textAlign: 'left', width: '300px', height: '200px' }}>
                {isExpanded &&
                    <ol>
                        <li>Select a game mode: timed or untimed. Then select a board size: 3x3 or 4x4.
                            The board is a grid of letters.</li>
                        <li>For the timed mode, the timer will be set to one minute. You
                            will have this amount of time to find as many words as possible!</li>
                        <li>When the timer starts, begin searching for words on the Boggle
                            board. Words can be formed by connecting adjacent letters in any
                            direction (horizontally, vertically, or diagonally).</li>
                        <li>Enter your word in the text box given, and if it is a valid
                            word, you will be awarded points depending on the word length.</li>
                        <li>When the timer ends, your score will be recorded.</li>
                        <li>The untimed version is just to practice finding more words.
                            All the words missed will be shown at the end.</li>
                        <li>If you want to continue playing, return to the main menu
                            select a new game mode and board size. Try to beat your previous
                            score</li>
                    </ol>}
            </div>
        </>
    );
};