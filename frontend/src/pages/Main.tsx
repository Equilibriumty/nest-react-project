import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Student, Teacher } from '../types/types';

const Main = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/register');
  };
  const fetchStudents = async () => {
    const { data } = await axios.get<Teacher[]>(
      'http://localhost:3001/teachers'
    );
    return data;
  };

  const { data, error, isLoading } = useQuery<Teacher[]>(
    ['getTeacher'],
    fetchStudents
  );
  return (
    <div>
      Main stream test stream
      <Button onClick={handleClick}>Logout</Button>
      <div>
        {data?.map((student) => (
          <div>{student.username}</div>
        ))}
      </div>
    </div>
  );
};

export default Main;
