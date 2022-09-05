import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFetchTeacher } from '../hooks/useFetchTeacher';

const TeacherPage = () => {
  const { user, logout } = useAuth();
  const { data, error, isLoading } = useFetchTeacher(user.id!, user.email);
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/register');
  };
  return (
    <div>
      Main stream test stream
      <Button onClick={handleClick}>Logout</Button>
      <div>{data?.username}</div>
    </div>
  );
};

export default TeacherPage;
