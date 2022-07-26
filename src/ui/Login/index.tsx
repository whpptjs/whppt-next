import { Formik } from 'formik';
import React, { useState } from 'react';
import { LoginArgs } from '../../Security/Api';
import { useWhppt } from '../../Context';
import { WhpptButton, WhpptInput } from '../components';
import { WhpptLoginOverlay } from './WhpptLoginOverlay';

export const WhpptLogin = () => {
  const { api } = useWhppt();

  const [userToLogin] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const { setUser } = useWhppt();

  const login = (values: LoginArgs) => {
    setError(false);
    return api.security
      .login(values)
      .then(_user => {
        setUser(_user);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <WhpptLoginOverlay>
      <Formik
        initialValues={userToLogin}
        validate={values => {
          const errors = {} as any;
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={values => {
          login(values);
        }}>
        {({ handleSubmit, values, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <WhpptInput
              id={'login_username'}
              label={'Username / Email*'}
              info={''}
              type={'text'}
              name={'username'}
              value={values.username}
              onChangeEvent={handleChange}
              error={errors.username}
            />
            <WhpptInput
              id={'login_password'}
              name={'password'}
              label={'Password*'}
              info={''}
              type={'password'}
              value={values.password}
              onChangeEvent={handleChange}
              error={errors.password}
            />
            {error && <div className="whppt-login--error">Opps, We could not find you</div>}

            <div className="whppt-login--actions">
              <div>
                <WhpptButton text={'Login'} type="submit" onClick={() => handleSubmit} />
              </div>
              <WhpptButton
                text={'Forgotten Password'}
                secondary={true}
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </form>
        )}
      </Formik>
    </WhpptLoginOverlay>
  );
};
