import { Formik } from 'formik';
import LoginSharedInputs from './LoginSharedInputs';
import {
  LoginInitialValues,
  loginValidationScheme,
} from '../types/validations';

const LoginForms = () => {
  const initialValues: LoginInitialValues = { email: '', password: '' };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
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
        onSubmit={(values) => console.log(values)}
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
