import React, { FC, useState } from 'react';
import { Domain } from '../../../App/Model';
import { useWhppt } from '../../../Context';
import { WhpptInput, WhpptButton } from '../../../ui/components';

export const WhpptEditDomain: FC<{ domain: Domain; callback: () => void }> = ({
  domain,
  callback,
}) => {
  const { api } = useWhppt();

  const [domainToEdit, setDomain] = useState(domain);
  console.log(
    '🚀 ~ file: WhpptEditDomain.tsx ~ line 13 ~ domainToEdit',
    domainToEdit
  );

  const save = () => {
    api.app.domain.save(domainToEdit).then(() => {
      setDomain({} as Domain);
      callback();
    });
  };
  const getValue = () => {
    return domainToEdit.hostNames && domainToEdit.hostNames.join(',');
  };
  return (
    <section className="whppt-form-section whppt-form-section--bottom-gap">
      <form>
        <h4>Edit domain</h4>
        <div className="whppt-form-split">
          <div className="whppt-form-split--even">
            <WhpptInput
              value={domainToEdit.name}
              onChange={(name: string) => {
                setDomain({ ...domainToEdit, name });
              }}
              id={'editDomainName'}
              label={'Name'}
              info={''}
              error={''}
              type={'text'}
            />
          </div>
          <div className="whppt-form-split--even">
            <WhpptInput
              value={getValue()}
              onChange={(hostNames: string) => {
                setDomain({
                  ...domainToEdit,
                  hostNames: hostNames.split(',').map((h) => h.trim()),
                });
              }}
              id={'editDomainhostnames'}
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
          <WhpptButton text="Save" icon="save" onClick={save} />
          <WhpptButton text="Cancel" onClick={callback} />
        </div>
      </form>
    </section>
  );
};
