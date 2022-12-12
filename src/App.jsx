import React from 'react';
import './styles/board.css';
import { Route, Routes } from "react-router";
import SinglePlayerTimed from "./pages/SinglePlayerTimed.jsx"
import LoginPage from "./pages/Login.jsx";
import { AuthProvider } from "./backend/AuthContext.jsx";
import SignupPage from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SinglePlayerWait from "./pages/SinglePlayerWait.jsx";
import SinglePlayerUntimed from "./pages/SinglePlayerUntimed.jsx";
import SelectBoardScreen from "./pages/SelectBoardScreen.jsx";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path='/wait' element={<PrivateRoute children={
                    <SinglePlayerWait />}
                />}> </Route>
                <Route path='/select-board' element={<PrivateRoute children={
                    <SelectBoardScreen/>}
                />}> </Route>
                <Route path='/timed' element={<PrivateRoute children={
                    <SinglePlayerTimed />}
                />}> </Route>
                <Route path='/untimed' element={<PrivateRoute children={
                    <SinglePlayerUntimed />}
                />}> </Route>
            </Routes>
        </AuthProvider>
    );
}