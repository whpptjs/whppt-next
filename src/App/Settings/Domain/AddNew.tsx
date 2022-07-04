import React, { FC, useState } from 'react';
import { useWhppt } from '../../../Context';
import { WhpptInput, WhpptButton } from '../../../ui/components';

export const DomainAddNewForm: FC = () => {
  const { api } = useWhppt();
  const [newDomain, setNewDomain] = useState({
    name: '',
    hostnames: [],
    published: false,
    createdAt: new Date(),
  });

  const addItem = () => {
    //TODO check fields are done.
    api.app.domain.save(newDomain).then(() => {
      setNewDomain({
        name: '',
        hostnames: [],
        published: false,
        createdAt: new Date(),
      });
    });
  };

  return (
    <section className="whppt-form-section whppt-form-section--bottom-gap">
      <form>
        <h4>Add a new domain</h4>
        <div className="whppt-form-split">
          <div className="whppt-form-split--even">
            <WhpptInput
              value={newDomain.name}
              onChange={(name: string) => {
                setNewDomain({ ...newDomain, name });
              }}
              id={'newDomainName'}
              label={'Name'}
              info={''}
              error={''}
              type={'text'}
            />
          </div>
          <div className="whppt-form-split--even">
            <WhpptInput
              value={newDomain.hostnames.join(',')}
              onChange={(hostnames: string) => {
                setNewDomain({
                  ...newDomain,
                  hostnames: hostnames.split(',').map((h) => h.trim()),
                });
              }}
              id={'newDomainhostnames'}
              label={'Host names'}
              info={
                'Comma seperate items without the www eg: whppt.com,sveltestudios.com'
              }
              error={''}
              type={'text'}
            />
          </div>
        </div>
        <div>
          <WhpptButton text="Add New Domain" onClick={addItem} />
        </div>
      </form>
    </section>
  );
};
