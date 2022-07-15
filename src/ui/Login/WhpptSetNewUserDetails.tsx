import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { WhpptButton, WhpptInput } from '../components';
import { WhpptLoginOverlay } from './WhpptLoginOverlay';
import { useRouter } from 'next/router';
import { useWhppt } from '../../Context';

export const WhpptSetNewUserDetails: FC = () => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '', passwordConfirmation: '', token: '' });
  const router = useRouter();
  const [error, setError] = useState('');
  const { api } = useWhppt();

  const submit = values => {
    const set = api.security
      .setPassword({ email: userDetails.email, password: values.password, token: userDetails.token })
      .then(() => setUserDetails({ email: '', password: '', passwordConfirmation: '', token: '' }))
      .catch(err => {
        setError('Something went wrong..');
        throw Error(err);
      });
    toast.promise(set, {
      pending: 'Saving...',
      success: `Password successfully reset, you can now login.`,
      error: `Failed to save details 🤯`,
    });
  };

  useEffect(() => {
    if (!router.query || !router.query.token) return;
    setUserDetails({ ...userDetails, email: router.query.email as string, token: router.query.token as string });
  }, [router.query && router.query.token]);

  if (!userDetails.token) return <></>;

  const SignupSchema = Yup.object().shape({
    password: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
    passwordConfirmation: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required'),
  });
  return (
    <WhpptLoginOverlay>
      <Formik
        initialValues={userDetails}
        validationSchema={SignupSchema}
        onSubmit={values => {
          submit(values);
        }}>
        {({ handleSubmit, values, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <WhpptInput
              id={'register_email'}
              label={'Email*'}
              info={''}
              type={'text'}
              name={'email'}
              value={values.email}
              onChangeEvent={handleChange}
              error={errors.email}
              disabled
            />
            <WhpptInput
              id={'register_password'}
              label={'Password*'}
              info={''}
              type={'text'}
              name={'password'}
              value={values.password}
              onChangeEvent={handleChange}
              error={errors.password}
            />
            <WhpptInput
              id={'register_passwordConfirmation'}
              label={'Password Confirmation*'}
              info={''}
              type={'text'}
              name={'passwordConfirmation'}
              value={values.passwordConfirmation}
              onChangeEvent={handleChange}
              error={errors.passwordConfirmation}
            />
            {/* {error && <div className="whppt-login--error">Opps, We could not find you</div>} */}

            <div className="whppt-login--actions">
              <div>
                <WhpptButton text={'Save'} type="submit" onClick={() => handleSubmit} />
              </div>
            </div>
            <div className="whppt-error">{error}</div>
          </form>
        )}
      </Formik>

      {/* <whppt-input
                :id="`${$options._scopeId}-recov-email`"
                v-model="recovery.email"
                label="Email"
                placeholder="Please enter your email."
              />
              <whppt-input
                :id="`${$options._scopeId}-recov-password`"
                v-model="recovery.password"
                type="password"
                label="Password"
                placeholder="Please enter your password."
              />
              <whppt-input
                :id="`${$options._scopeId}-recov-confirm`"
                v-model="recovery.passwordConfirm"
                type="password"
                label="Password Confirmation"
                placeholder="Please enter your password again."
              /> */}
    </WhpptLoginOverlay>
  );
};
