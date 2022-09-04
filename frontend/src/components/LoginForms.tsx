import { Formik, FormikHelpers } from 'formik';
import LoginSharedInputs from './LoginSharedInputs';
import {
  LoginInitialValues,
  loginValidationScheme,
  StudentLog,
  TeacherLog,
} from '../types/types';
import { useMutation } from 'react-query';
import authApi from '../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginForms = () => {
  const initialValues: LoginInitialValues = {
    id: 123,
    email: '',
    password: '',
  };
  const navigation = useNavigate();
  const { login } = useAuth();
  const loginStudent = useMutation(
    (values: StudentLog) => authApi.loginStudent(values),
    {
      onSuccess: async (response: AxiosResponse) => {
        localStorage.setItem('token', response.data.token);
        login();
        navigation('/');
      },
      onError: (error) => console.log(error),
    }
  );

  const loginTeacher = useMutation(
    (values: TeacherLog) => authApi.loginTeacher(values),
    {
      onSuccess: async (response: AxiosResponse) => {
        localStorage.setItem('token', response.data.token);
        login();
        navigation('/');
      },
      onError: (error) => console.log(error),
    }
  );
  const handleTeacherSubmit = (
    values: LoginInitialValues,
    actions: FormikHelpers<LoginInitialValues>
  ) => {
    actions.resetForm();
    loginTeacher.mutate(values);
  };

  const handleStudentSubmit = (
    values: LoginInitialValues,
    actions: FormikHelpers<LoginInitialValues>
  ) => {
    actions.resetForm();
    loginStudent.mutate(values);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleTeacherSubmit}
        validationSchema={loginValidationScheme}
        validateOnMount
      >
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <LoginSharedInputs
            role='teacher'
            errors={errors}
            handleChange={handleChange}
            values={values}
            handleSubmit={handleSubmit}
            isValid={isValid}
          />
        )}
      </Formik>
      <Formik
        initialValues={initialValues}
        onSubmit={handleStudentSubmit}
        validationSchema={loginValidationScheme}
        validateOnMount
      >
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <LoginSharedInputs
            role='student'
            errors={errors}
            handleChange={handleChange}
            values={values}
            handleSubmit={handleSubmit}
            isValid={isValid}
          />
        )}
      </Formik>
    </div>
  );
};

export default LoginForms;
