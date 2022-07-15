import React, { FC } from 'react';
import { WhpptTab } from '../../../ui/components';
import { InviteNewUser } from './InviteNewUser';

export const WhpptUsers: FC<WhpptTab> = () => {
  return (
    <div className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <InviteNewUser />
      </section>

      <div className="whppt-form-page-settings__form"></div>
    </div>
  );
};
