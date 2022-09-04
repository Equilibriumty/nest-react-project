import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Main from './Main';
import Register from './Register';

const RootRoutes = () => {
  const { login, isAuthenticated } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login();
    }
  }, [login]);

  const AuthRoutes = () => {
    return (
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    );
  };

  const MainRoute = () => {
    return (
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    );
  };
  return <div>{isAuthenticated ? <MainRoute /> : <AuthRoutes />}</div>;
};

export default RootRoutes;
