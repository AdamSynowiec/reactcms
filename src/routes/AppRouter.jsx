import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import BlankPage from '../pages/BlankPage';
import NoPage from '../pages/NoPage';

const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' element={<BlankPage />} />
            <Route
                path="/admin"
                element={false ? <Navigate to={"/"} /> : <LoginPage />}
            />
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default AppRouter;
