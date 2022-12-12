import React, {useRef, useState} from 'react';
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { useAuth } from '../backend/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import ReturnHomeButton from "../components/ReturnHome.jsx";

export default function SignupPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/wait")
        } catch {
            setLoading(false)
            return setError('Failed to create an account');
        }
    }

    return (
        <>
            <ReturnHomeButton />
            <Container
                className="d-flex  justify-content-center"
                style={{minHeight: "100vh", paddingTop: '50px'}}
            >
            <span className="w-100" style={{maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-3">Sign up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                Email
                                <Form.Control
                                    type="email"
                                    ref={emailRef} required
                                />
                            </Form.Group>
                            <Form.Group id="password">
                                Password
                                <Form.Control
                                    type="password"
                                    ref={passwordRef} required
                                />
                            </Form.Group>
                            <div align="right">
                                <Button disabled={loading} variant="outline-primary" className="mt-4" type="submit">
                                Sign Up
                            </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center m-2">
                    Already have an account? <Link to='/login'>Login here</Link>
                </div>
            </span>
            </Container>
        </>
    );
}