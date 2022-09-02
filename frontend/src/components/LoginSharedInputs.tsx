import { Button, TextField, Typography } from '@mui/material';
import { FormikErrors } from 'formik';
import { LoginInitialValues } from '../types/types';

interface LoginSharedInputsProps {
  role: string;
  errors: FormikErrors<LoginInitialValues>;
  values: LoginInitialValues;
  isValid: boolean;
  handleSubmit: () => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}
// TODO FIX TYPINGS AND ADD VALIDATION VIA YUP

const LoginSharedInputs = ({
  role,
  handleSubmit,
  values,
  errors,
  isValid,
  handleChange,
}: LoginSharedInputsProps) => {
  return (
    <div>
      {role === 'teacher' ? (
        <>
          <Typography>Login as teacher</Typography>
          <TextField
            name='email'
            value={values.email}
            onChange={handleChange('email')}
            helperText={errors.email}
          />

          <TextField
            name='password'
            type='password'
            value={values.password}
            helperText={errors.password}
            onChange={handleChange('password')}
          />
          <Button onClick={handleSubmit} disabled={!isValid}>
            Login
          </Button>
        </>
      ) : (
        <>
          <Typography>Login as student</Typography>
          <TextField
            name='email'
            value={values.email}
            onChange={handleChange('email')}
            helperText={errors.email}
          />

          <TextField
            name='password'
            type='password'
            value={values.password}
            helperText={errors.password}
            onChange={handleChange('password')}
          />
          <Button onClick={handleSubmit} disabled={!isValid}>
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginSharedInputs;
