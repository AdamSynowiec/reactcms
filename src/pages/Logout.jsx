import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <div>Wylogowanie...</div>
    );
}

export default Logout;
