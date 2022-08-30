import { Formik } from 'formik';
import React from 'react';
import RegisterSharedInputs from './RegisterSharedInputs';
import SharedInputs from './RegisterSharedInputs';

const RegisterForms = () => {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <RegisterSharedInputs
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
          username: '',
          password: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <RegisterSharedInputs
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

export default RegisterForms;
