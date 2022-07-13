import React, { FC, ReactElement } from 'react';
import { WhpptIcon } from './components';

export const ConfirmationPopup: FC<{
  header: string;
  close: () => void;
  children: ReactElement;
}> = ({ header, close, children }) => {
  return (
    <div className="whppt-confirmation-popup">
      <div className="whppt-confirmation-popup-content">
        <div className="whppt-confirmation-popup-content__header">
          {header}
          <button
            onClick={() => close()}
            className="whppt-confirmation-popup-content__header--action"
          >
            <WhpptIcon is="close" />
          </button>
        </div>
        <div className="whppt-confirmation-popup-content__children">
          {children}
        </div>
      </div>
    </div>
  );
};
