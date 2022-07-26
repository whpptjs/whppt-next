import React, { FC, ReactElement } from 'react';
import { WhpptIcon } from '../components';

export const WhpptLoginOverlay: FC<{ children: ReactElement[] | ReactElement }> = ({ children }) => {
  return (
    <div className="whppt-login">
      <div className="whppt-login--width">
        <div className="whppt-login--logo">
          <WhpptIcon is="bruce" />
        </div>
        <h2 className="whppt-login--header">Whppt CMS</h2>
        {children}
      </div>
    </div>
  );
};
