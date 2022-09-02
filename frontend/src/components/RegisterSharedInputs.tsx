import { Button, TextField, Typography } from '@mui/material';
import { FormikErrors } from 'formik';
import { RegisterInitialValues } from '../types/types';

interface RegisterSharedInputsProps {
  role: string;
  errors: FormikErrors<RegisterInitialValues>;
  values: RegisterInitialValues;
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

const RegisterSharedInputs = ({
  role,
  handleSubmit,
  values,
  errors,
  isValid,
  handleChange,
}: RegisterSharedInputsProps) => {
  return (
    <div>
      {role === 'teacher' ? (
        <>
          <Typography>Register as teacher</Typography>
          <TextField
            name='email'
            value={values.email}
            onChange={handleChange('email')}
            helperText={errors.email}
          />
          <TextField
            name='username'
            value={values.username}
            onChange={handleChange('username')}
            helperText={errors.username}
          />
          <TextField
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
            helperText={errors.password}
          />
          <Button onClick={handleSubmit} disabled={!isValid}>
            Register
          </Button>
        </>
      ) : (
        <>
          <Typography>Register as student</Typography>
          <TextField
            name='email'
            value={values.email}
            onChange={handleChange('email')}
            helperText={errors.email}
          />
          <TextField
            name='username'
            value={values.username}
            onChange={handleChange('username')}
            helperText={errors.username}
          />
          <TextField
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
            helperText={errors.password}
          />
          <Button onClick={handleSubmit} disabled={!isValid}>
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default RegisterSharedInputs;
