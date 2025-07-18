import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BlankPage from './pages/BlankPage';
import NoPage from './pages/NoPage';
import { useDispatch } from 'react-redux';
import { checkSession } from './utils/checkSession';
import Logout from './pages/Logout';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkSession(dispatch);
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<BlankPage />} />
      <Route path='/logout' element={<Logout />} />
      <Route
        path="/admin"
        element={false ? <Navigate to={"/"} /> : <LoginPage />}
      />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default App;
