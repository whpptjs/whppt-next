import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useWhppt } from '../../../Context';
import { User } from '../../../Security/Model';
import { WhpptButton, WhpptIcon, WhpptInput } from '../../../ui/components';

export const InviteNewUser: FC<{ callback: () => void }> = ({ callback }) => {
  const [showForm, setShowForm] = useState(false);
  const { api } = useWhppt();

  const [newUser] = useState({
    username: '',
    email: '',
  } as User);
  const [inviteToken, setInviteToken] = useState('');

  const addUser = (user: User, reset) => {
    const save = api.app.user.create(user).then(token => {
      setInviteToken(token);
      reset();
      callback();
    });
    toast.promise(save, {
      pending: 'Inviting...',
      success: `User invited`,
      error: `Failed to invite user 🤯`,
    });
  };

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteToken);
    toast('Copied to clipboard');
  };

  return (
    <div>
      {showForm ? (
        <>
          <section className="whppt-form-section whppt-form-section--bottom-gap">
            {inviteToken ? (
              <div>
                <div className="whppt-form--bottom-gap">
                  We have successfully created a user, to complete the sign up process send them the following link. The link expires in 24
                  hours.
                </div>
                <div className="whppt-form--bottom-gap">
                  <button className=" whppt-form__user-invite" onClick={() => copyInvite()}>
                    <div>
                      {inviteToken}
                      <WhpptIcon is={'copy'} />
                    </div>
                  </button>
                </div>
                <div className="whppt-form--flex-apart">
                  <WhpptButton
                    text="Cancel"
                    secondary
                    onClick={() => {
                      setShowForm(false);
                      setInviteToken('');
                    }}
                  />
                  <WhpptButton text="Invite Another" onClick={() => setInviteToken('')} />
                </div>
              </div>
            ) : (
              <Formik
                initialValues={newUser}
                validate={values => {
                  const errors = {} as any;
                  if (!values.username) {
                    errors.username = 'Required';
                  }

                  if (!values.email) {
                    errors.email = 'Required';
                  }
                  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(errors.email)) {
                  //   errors.email = 'Invalid email address';
                  // }
                  return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                  addUser(values, resetForm);
                }}>
                {({ handleSubmit, values, errors, handleChange }) => (
                  <form onSubmit={handleSubmit}>
                    <h4>Invite a new user</h4>
                    <WhpptInput
                      value={values.username}
                      onChangeEvent={handleChange}
                      id={'newUserUsername'}
                      label={'Username'}
                      info={''}
                      error={errors.username}
                      type={'text'}
                      name="username"
                    />
                    <WhpptInput
                      value={values.email}
                      onChangeEvent={handleChange}
                      id={'newUserEmail'}
                      label={'Email'}
                      info={''}
                      error={errors.email}
                      type={'email'}
                      name="email"
                    />
                    <div className="whppt-form--flex-apart">
                      <WhpptButton text="Cancel" secondary onClick={() => setShowForm(false)} />
                      <WhpptButton text="Invite" type="submit" onClick={() => handleSubmit} />
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </section>
        </>
      ) : (
        <WhpptButton text={'Invite New User'} onClick={() => setShowForm(true)} />
      )}
    </div>
  );
};
