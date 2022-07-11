import React, { FC, useState } from 'react';
import { Formik } from 'formik';

import { Domain } from '../../Model';
import { useWhppt } from '../../../Context';
import { WhpptInput, WhpptButton } from '../../../ui/components';

export const WhpptEditDomain: FC<{ domain: Domain; callback: () => void }> = ({
  domain,
  callback,
}) => {
  const { api } = useWhppt();
  const getValue = () => {
    return (domain.hostNames && domain.hostNames.join(',')) || '';
  };

  const [domainToEdit] = useState({
    ...domain,
    hostNames: getValue(),
  });

  const save = (domain: Domain) => {
    return api.app.domain.save(domain).then(() => {
      callback();
    });
  };
  return (
    <section className="whppt-form-section whppt-form-section--bottom-gap">
      <Formik
        initialValues={domainToEdit}
        validate={(values) => {
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
          save({
            ...values,
            hostNames: values.hostNames.split(',').map((h) => h.trim()),
          }).then(() => {
            resetForm();
          });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <h4>Edit domain</h4>
            <div className="whppt-form-split">
              <div className="whppt-form-split--even">
                <WhpptInput
                  value={props.values.name}
                  onChangeEvent={props.handleChange}
                  id={'newDomainName'}
                  label={'Name'}
                  info={''}
                  error={props.errors.name}
                  type={'text'}
                  name="name"
                />
              </div>
              <div className="whppt-form-split--even">
                <WhpptInput
                  value={props.values.hostNames}
                  onChangeEvent={props.handleChange}
                  id={'newDomainhostnames'}
                  label={'Host names'}
                  info={
                    'Comma seperate items without the www eg: whppt.com,sveltestudios.com'
                  }
                  error={props.errors.hostNames}
                  type={'text'}
                  name="hostNames"
                />
              </div>
            </div>
            <div className="form-actions">
              <div className="form-actions--action">
                <WhpptButton
                  type="submit"
                  text="Save"
                  icon="save"
                  onClick={() => props.handleSubmit}
                />
              </div>
              <div>
                <WhpptButton text="Cancel" onClick={callback} />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};
