import React, { FC } from 'react';

import { WhpptButton } from '../components';
import { ConfirmationPopup } from '../ConfirmationPopup';

export const StandardPopup: FC<{ cancel: () => void; accept: () => void; message: string; header?: string }> = ({
  cancel,
  accept,
  message,
  header = 'Are you sure?',
}) => {
  return (
    <ConfirmationPopup close={() => cancel()} header={header}>
      <div>
        <div className="whppt-confirmation-popup-content__children--message">{message}</div>
        <div className="whppt-confirmation-popup-content__children--actions">
          <WhpptButton secondary={true} text={'Cancel'} onClick={() => cancel()} />
          <WhpptButton text={'Confirm'} onClick={() => accept()} />
        </div>
      </div>
    </ConfirmationPopup>
  );
};
