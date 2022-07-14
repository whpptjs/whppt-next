import React, { FC, useEffect, useState } from 'react';
import { useWhppt } from '../../../Context';
// import { WhpptInput, WhpptButton } from '../../../ui/componentsnts';
import { WhpptTab } from '../../../ui/components';
import { DomainAddNewForm } from './AddNew';
import { DomainsList } from './DomainsList';

export const Domain: FC<WhpptTab> = () => {
  const { api } = useWhppt();
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    api.app.domain.list().then(domains => {
      setDomains(
        domains.map(d => ({
          ...d,
          hostNameValue: d.hostNames && d.hostNames.join(', '),
        }))
      );
    });
  }, [api.app.domain]);
  const requery = () => {
    api.app.domain.list().then(domains => {
      setDomains(domains);
    });
  };

  return (
    <div className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <DomainAddNewForm callback={requery} />
      </section>

      <div className="whppt-form-page-settings__form">
        <DomainsList domains={domains} requery={requery} />
      </div>
    </div>
  );
};
