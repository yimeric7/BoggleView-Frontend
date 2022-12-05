import React from 'react';

export default function Letter({ boardLetter }) {
    const handleClick = () => {
        console.log('clicked');
    }
    return (
        <div class="letter">
            <span onClick={handleClick}>{boardLetter.toUpperCase()}</span>
        </div>
    );
}