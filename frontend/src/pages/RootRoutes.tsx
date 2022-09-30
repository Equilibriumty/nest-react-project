import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Main from './Main';
import Register from './Register';

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function MainRoute() {
  return (
    <Routes>
      <Route index element={<Main />} />
    </Routes>
  );
}

function RootRoutes() {
  const { login, isAuthenticated } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login();
    }
  }, [login]);

  return <div>{isAuthenticated ? <MainRoute /> : <AuthRoutes />}</div>;
}

export default RootRoutes;
