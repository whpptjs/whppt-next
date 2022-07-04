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
    api.app.domain.list().then((domains) => {
      setDomains(domains);
    });
    // .catch((err) => setError(err));
  }, []);

  return (
    <div className="whppt-form">
      <section className="whppt-form-page-settings__actions"></section>

      <div className="whppt-form-page-settings__form">
        <DomainAddNewForm />
        <DomainsList domains={domains} />
      </div>
    </div>
  );
};
