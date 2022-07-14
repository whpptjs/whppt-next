import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useWhppt } from '../../../Context';
import { User } from '../../../Security/Model';
import { WhpptButton, WhpptInput } from '../../../ui/components';

export const InviteNewUser: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { api } = useWhppt();

  const [newUser] = useState({
    name: '',
    email: '',
  } as User);

  const addUser = (user: User, reset) => {
    // const save = api.app.user.save(user).then(() => reset());
    // toast.promise(save, {
    //   pending: 'Inviting...',
    //   success: `User invited`,
    //   error: `Failed to invite user 🤯`,
    // });
  };

  return (
    <div>
      {showForm ? (
        <section className="whppt-form-section whppt-form-section--bottom-gap">
          <Formik
            initialValues={newUser}
            validate={values => {
              const errors = {} as any;
              if (!values.name) {
                errors.name = 'Required';
              }

              if (!values.email) {
                errors.email = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              addUser(values, resetForm);
            }}>
            {({ handleSubmit, values, errors, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <h4>Invite a new user</h4>
                <WhpptInput
                  value={values.name}
                  onChangeEvent={handleChange}
                  id={'newDomainName'}
                  label={'Name'}
                  info={''}
                  error={errors.name}
                  type={'text'}
                  name="name"
                />
                <WhpptInput
                  value={values.email}
                  onChangeEvent={handleChange}
                  id={'newDomainEmail'}
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
        </section>
      ) : (
        <WhpptButton text={'Invite New User'} onClick={() => setShowForm(true)} />
      )}
    </div>
  );
};
