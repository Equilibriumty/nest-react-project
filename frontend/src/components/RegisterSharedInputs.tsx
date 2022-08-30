import { Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';

interface RegisterSharedInputsProps {
  role: string;
  errors: any;
  values: any;
  handleSubmit: any;
  handleChange: any;
}
// TODO FIX TYPINGS AND ADD VALIDATION VIA YUP

const RegisterSharedInputs = ({
  role,
  handleSubmit,
  values,
  errors,
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
          />
          <TextField
            name='username'
            value={values.username}
            onChange={handleChange('username')}
          />
          <TextField
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button onClick={handleSubmit}>Register</Button>
        </>
      ) : (
        <>
          <Typography>Register as student</Typography>
          <TextField
            name='email'
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            name='username'
            value={values.username}
            onChange={handleChange('username')}
          />
          <TextField
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button onClick={handleSubmit}>Register</Button>
        </>
      )}
    </div>
  );
};

export default RegisterSharedInputs;
