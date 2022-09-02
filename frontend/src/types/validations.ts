import * as yup from 'yup';

export const loginValidationScheme = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Min length is 6 characters')
    .max(20, 'Max length is 20 characters'),
});

export const registerValidationScheme = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  username: yup
    .string()
    .min(4, 'Min length is 4 characters')
    .max(30, 'Max length is 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Min length is 6 characters')
    .max(20, 'Max length is 20 characters'),
});

export interface LoginInitialValues {
  email: string;
  password: string;
}

export interface RegisterInitialValues {
  email: string;
  username: string;
  password: string;
}
