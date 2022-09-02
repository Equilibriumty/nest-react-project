import { Formik } from 'formik';
import RegisterSharedInputs from './RegisterSharedInputs';
import {
  RegisterInitialValues,
  registerValidationScheme,
} from '../types/validations';
const RegisterForms = () => {
  const initialValues: RegisterInitialValues = {
    email: '',
    username: '',
    password: '',
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={registerValidationScheme}
        validateOnMount
      >
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <RegisterSharedInputs
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
        validationSchema={registerValidationScheme}
        validateOnMount
      >
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <RegisterSharedInputs
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

export default RegisterForms;
