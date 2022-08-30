import { Formik } from 'formik';
import LoginSharedInputs from './LoginSharedInputs';

const LoginForms = () => {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <LoginSharedInputs
            role='teacher'
            errors={errors}
            handleChange={handleChange}
            values={values}
            handleSubmit={handleSubmit}
          />
        )}
      </Formik>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <LoginSharedInputs
            role='student'
            errors={errors}
            handleChange={handleChange}
            values={values}
            handleSubmit={handleSubmit}
          />
        )}
      </Formik>
    </div>
  );
};

export default LoginForms;
