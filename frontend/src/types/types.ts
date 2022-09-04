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

export type LoginInitialValues = {
  id: number;
  email: string;
  password: string;
};

export type RegisterInitialValues = {
  email: string;
  username: string;
  password: string;
  role: string;
};

export type Course = {
  id?: string;
  title: string;
  description: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  teacherId: string;
};

export type Task = {
  taskId?: string;
  title: string;
  description: string;
  uploadedAt?: string | Date;
  mark: number;
  fileId: string;
  courseId?: string;
};

export type Student = {
  id?: string;
  username: string;
  email: string;
  password: string;
  role?: 'STUDENT';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  courses?: Course[];
};
export type Teacher = {
  id?: string;
  username: string;
  email: string;
  password: string;
  role?: 'TEACHER';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  courses?: Course[];
};

export type StudentReg = RegisterInitialValues;
export type TeacherReg = RegisterInitialValues;
export type TeacherLog = LoginInitialValues;
export type StudentLog = LoginInitialValues;
