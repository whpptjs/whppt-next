import React, { FC, useState } from 'react';
// import { useWhppt } from '../../Context';
import { WhpptButton, WhpptCheckbox } from '../components';
import { ConfirmationPopup } from '../ConfirmationPopup';

export const SavePagePopup: FC<{ callback: () => void }> = ({ callback }) => {
  const [publish, setPublish] = useState(false);
  // const { api } = useWhppt();

  const confirm = () => {
    // return api.page;
  };

  return (
    <ConfirmationPopup header="Are you sure?">
      <div className="">
        <div className="whppt-confirmation-popup-content__children--message">
          Are you sure you want to save this page?
        </div>
        <WhpptCheckbox
          label={'Publish page aswell'}
          value={`${publish}`}
          onChange={() => setPublish(!publish)}
        ></WhpptCheckbox>
        <div className="whppt-confirmation-popup-content__children--actions">
          <WhpptButton
            secondary={true}
            text={'Cancel'}
            onClick={() => callback()}
          />
          <WhpptButton text={'Confirm'} onClick={() => confirm()} />
        </div>
      </div>
    </ConfirmationPopup>
  );
};
