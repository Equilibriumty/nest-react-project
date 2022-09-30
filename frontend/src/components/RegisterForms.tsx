import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import RegisterSharedInputs from './RegisterSharedInputs';
import {
  RegisterInitialValues,
  registerValidationScheme,
  Student,
  StudentReg,
  TeacherReg,
} from '../types/types';
import authApi from '../service/auth.service';
import { useAuth } from '../context/AuthContext';

function RegisterForms() {
  const navigation = useNavigate();
  const { setUser } = useAuth();
  const initialTeacherValues: RegisterInitialValues = {
    email: '',
    username: '',
    password: '',
    role: 'TEACHER',
  };
  const initialStudentValues: RegisterInitialValues = {
    email: '',
    username: '',
    password: '',
    role: 'STUDENT',
  };
  const registerStudent = useMutation(
    (values: StudentReg) => authApi.registerStudent(values),
    {
      onSuccess: async (response: AxiosResponse<Student>) => {
        localStorage.setItem('token', response.data.token);
        setUser(response.data);
        navigation('/');
      },
      onError: (error) => console.log(error),
    }
  );

  const registerTeacher = useMutation(
    (values: TeacherReg) => authApi.registerTeacher(values),
    {
      onSuccess: async (response: AxiosResponse) => {
        localStorage.setItem('token', response.data.token);
        setUser(response.data);
        navigation('/');
      },
      onError: (error) => console.log(error),
    }
  );

  const handleTeacherSubmit = (
    values: TeacherReg,
    actions: FormikHelpers<RegisterInitialValues>
  ) => {
    actions.resetForm();
    registerTeacher.mutate(values);
  };

  const handleStudentSubmit = (
    values: StudentReg,
    actions: FormikHelpers<RegisterInitialValues>
  ) => {
    actions.resetForm();
    registerStudent.mutate(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialTeacherValues}
        onSubmit={handleTeacherSubmit}
        validationSchema={registerValidationScheme}
        validateOnMount
      >
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <RegisterSharedInputs
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
        initialValues={initialStudentValues}
        onSubmit={handleStudentSubmit}
        validationSchema={registerValidationScheme}
        validateOnMount
      >
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <RegisterSharedInputs
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

export default RegisterForms;
