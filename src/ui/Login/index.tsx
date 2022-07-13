import { Formik } from 'formik';
import React, { useState } from 'react';
import { LoginArgs } from '../../Security/Api';
import { useWhppt } from '../../Context';
import { WhpptButton, WhpptIcon, WhpptInput } from '../components';

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
      .then((_user) => {
        setUser(_user);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className="whppt-login">
      <div className="whppt-login--logo">
        <WhpptIcon is="bruce" />
      </div>
      <h2 className="whppt-login--header">Whppt CMS</h2>
      <Formik
        initialValues={userToLogin}
        validate={(values) => {
          const errors = {} as any;
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <WhpptInput
              id={'login_username'}
              label={'Username / Email*'}
              info={''}
              type={'text'}
              name={'username'}
              value={props.values.username}
              onChangeEvent={props.handleChange}
              error={props.errors.username}
            />
            <WhpptInput
              id={'login_password'}
              name={'password'}
              label={'Password*'}
              info={''}
              type={'password'}
              value={props.values.password}
              onChangeEvent={props.handleChange}
              error={props.errors.password}
            />
            {error && (
              <div className="whppt-login--error">
                Opps, We couldn't find you
              </div>
            )}

            <div className="whppt-login--actions">
              <div>
                <WhpptButton
                  text={'Login'}
                  type="submit"
                  onClick={() => props.handleSubmit}
                />
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
    </div>
  );
};
