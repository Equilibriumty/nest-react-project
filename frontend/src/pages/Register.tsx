import { Link } from 'react-router-dom';
import RegisterForms from '../components/RegisterForms';

function Register() {
  return (
    <div>
      Register
      <RegisterForms />
      <Link to="/login">Have an account? Sign in</Link>
    </div>
  );
}

export default Register;
