import { Formik, FormikHelpers } from 'formik';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import LoginSharedInputs from './LoginSharedInputs';
import {
  LoginInitialValues,
  loginValidationScheme,
  Student,
  StudentLog,
  Teacher,
  TeacherLog,
} from '../types/types';
import authApi from '../service/auth.service';
import { useAuth } from '../context/AuthContext';

function LoginForms() {
  const initialValues: LoginInitialValues = {
    id: 'c8bc55c8-785f-4429-b863-faefc843181e',
    email: '',
    password: '',
  };
  const navigation = useNavigate();
  const { login, setUser } = useAuth();
  const loginStudent = useMutation(
    (values: StudentLog) => authApi.loginStudent(values),
    {
      onSuccess: async (response: AxiosResponse<Student>) => {
        localStorage.setItem('token', response.data.token);
        login();
        setUser(response.data);
        navigation('/');
      },
      onError: (error) => console.log(error),
    }
  );

  const loginTeacher = useMutation(
    (values: TeacherLog) => authApi.loginTeacher(values),
    {
      onSuccess: async (response: AxiosResponse<Teacher>) => {
        localStorage.setItem('token', response.data.token);
        login();
        setUser(response.data);
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
            role="teacher"
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
            role="student"
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
}

export default LoginForms;
