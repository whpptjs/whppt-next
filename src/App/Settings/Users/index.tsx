import React, { FC, useEffect, useState } from 'react';
import { WhpptTab } from '../../../ui/components';
import { InviteNewUser } from './InviteNewUser';
import { UsersList } from './UsersList';
import { User } from '../../../Security/Model';
import { useWhppt } from '../../../Context';

export const WhpptUsers: FC<WhpptTab> = () => {
  const { api } = useWhppt();
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    requery();
  }, []);

  const requery = () => {
    api.app.user.list().then(_users => {
      setUsers(_users);
    });
  };

  return (
    <div className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <InviteNewUser callback={requery} />
      </section>

      <div className="whppt-form-page-settings__form">
        <UsersList items={users} requery={requery} />
      </div>
    </div>
  );
};
