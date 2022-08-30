import { Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';

interface LoginSharedInputsProps {
  role: string;
  errors: any;
  values: any;
  handleSubmit: any;
  handleChange: any;
}
// TODO FIX TYPINGS AND ADD VALIDATION VIA YUP

const LoginSharedInputs = ({
  role,
  handleSubmit,
  values,
  errors,
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
          />

          <TextField
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button onClick={handleSubmit}>Login</Button>
        </>
      ) : (
        <>
          <Typography>Login as student</Typography>
          <TextField
            name='email'
            value={values.email}
            onChange={handleChange('email')}
          />

          <TextField
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button onClick={handleSubmit}>Login</Button>
        </>
      )}
    </div>
  );
};

export default LoginSharedInputs;
