import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { Domain } from '../../Model';
import { useWhppt } from '../../../Context';
import { WhpptInput, WhpptButton } from '../../../ui/components';

export const DomainAddNewForm: FC = () => {
  const { api } = useWhppt();
  const [newDomain] = useState({
    name: '',
    hostNames: '',
    published: false,
    createdAt: new Date(),
  });
  const [addNewShow, setAddNewShow] = useState(false);

  const addItem = (newDomain: Domain) => {
    return api.app.domain.save(newDomain);
  };

  return (
    <>
      {addNewShow ? (
        <section className="whppt-form-section whppt-form-section--bottom-gap">
          <Formik
            initialValues={newDomain}
            validate={values => {
              const errors = {} as any;
              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.hostNames) {
                errors.hostNames = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              addItem({
                ...values,
                hostNames: values.hostNames.split(',').map(h => h.trim()),
              }).then(() => {
                resetForm();
              });
            }}>
            {({ handleSubmit, values, errors, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <h4>Add a new domain</h4>
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
                  value={values.hostNames}
                  onChangeEvent={handleChange}
                  id={'newDomainhostnames'}
                  label={'Host names'}
                  info={'Comma seperate items without the www eg: whppt.com,sveltestudios.com'}
                  error={errors.hostNames}
                  type={'text'}
                  name="hostNames"
                />
                <div className="whppt-form--flex-apart">
                  <WhpptButton text="Cancel" secondary onClick={() => setAddNewShow(false)} />
                  <WhpptButton text="Add New Domain" type="submit" onClick={() => handleSubmit} />
                </div>
              </form>
            )}
          </Formik>
        </section>
      ) : (
        <div>
          <WhpptButton text="Add New Domain" onClick={() => setAddNewShow(true)} />
        </div>
      )}
    </>
  );
};
