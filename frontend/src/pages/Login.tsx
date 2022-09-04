import { Link } from 'react-router-dom';
import LoginForms from '../components/LoginForms';

const Login = () => {
  return (
    <div>
      Login
      <LoginForms />
      <Link to='/register'>Sign up</Link>
    </div>
  );
};

export default Login;
