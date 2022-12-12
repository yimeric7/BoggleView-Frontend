import React, { useRef, useState } from 'react';
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { useAuth } from '../backend/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import ReturnHomeButton from "../components/ReturnHome.jsx";
import '../styles/Login.css';

export default function LoginPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/wait")
        } catch {
            setLoading(false)
            return setError('Failed to sign in');
        }
    }

    return (
        <>
            <ReturnHomeButton />
            <Container
                className="d-flex  justify-content-center"
                style={{ minHeight: "100vh", paddingTop: '50px' }}
            >
                <div style={{ position: 'absolute', top: '33%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', width: '100%' }}>

                    <Card >
                        <Card.Body>
                            <div style={{ fontSize: '60px', lineHeight: '70px' }}>
                                <strong className="text-center mb-3">Login</strong>
                            </div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <div style={{ width: '100%', fontSize: '20px', lineHeight: '30px', position: 'absolute', transform: 'translateY(50%)', top: '45%' }}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <button className="style-button" style={{ pointerEvents: 'none', width: '7.5%', borderBottomLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>Email</button>
                                        <Form.Control
                                            type="email"
                                            ref={emailRef} required
                                            style={{ fontSize: '20px', lineHeight: '30px', paddingTop: '0.3em', paddingBottom: '0.3em', width: '25%', border: '0px solid', margin: 'none', borderTopRightRadius: '8px' }}
                                        />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <button className="style-button" style={{ pointerEvents: 'none', width: '7.5%', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>Password</button>
                                        <Form.Control
                                            type="password"
                                            ref={passwordRef} required
                                            style={{ fontSize: '20px', lineHeight: '30px', paddingTop: '0.3em', paddingBottom: '0.3em', width: '25%', border: '0px solid', margin: 'none', borderBottomRightRadius: '8px' }}
                                        />
                                    </Form.Group>
                                    <br />
                                    <div>
                                        <Button disabled={loading} variant="outline-primary" className="mt-4" id="login-button" type="submit" >
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="w-100 text-center m-2" style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '65%', left: '50%' }}>
                    Need an account? <Link to="/signup">Sign up here</Link>
                </div>
            </Container>
        </>
    );
}