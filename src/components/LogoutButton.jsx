import React from "react";
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../backend/AuthContext'

export default function LogoutButton() {
    const { logout } = useAuth();

    return (
        <div style={{ position: 'fixed', left: '5%', top: '0%', transform: 'translateY(50%)', fontSize: '20px' }}>
            <button onClick={logout} href="/">
            Logout</button>
        </div>
    );
}