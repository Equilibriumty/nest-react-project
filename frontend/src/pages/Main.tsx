import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';

function Main() {
  const { user } = useAuth();

  return (
    <div>{user.role === 'STUDENT' ? <StudentPage /> : <TeacherPage />}</div>
  );
}

export default Main;
