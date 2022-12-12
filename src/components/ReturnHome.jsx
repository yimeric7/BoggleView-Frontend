import { useNavigate } from 'react-router';
import React from "react";

export default function ReturnHomeButton() {
    const nav = useNavigate();
    return (
        <div style={{ position: 'fixed', right: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}>
            <button onClick={() => nav('/')}>
            Return home </button></div>
    )

}