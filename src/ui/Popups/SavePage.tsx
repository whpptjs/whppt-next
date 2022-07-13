import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';

import { useWhppt } from '../../Context';
import { WhpptButton, WhpptCheckbox } from '../components';
import { ConfirmationPopup } from '../ConfirmationPopup';

export const SavePagePopup: FC<{ callback: () => void }> = ({ callback }) => {
  const [publish, setPublish] = useState(false);
  const { api, page } = useWhppt();

  const confirm = () => {
    const save = api.page.save({ page, publish }).then(() => {
      callback();
    });
    toast.promise(save, {
      pending: 'Saving...',
      success: `Page ${publish ? 'Published' : 'Saved'}`,
      error: `Page Failed To ${publish ? 'Publish' : 'Save'} 🤯`,
    });
  };

  return (
    <ConfirmationPopup close={() => callback()} header="Are you sure?">
      <div>
        <div className="whppt-confirmation-popup-content__children--message">Are you sure you want to save this page?</div>
        <WhpptCheckbox label={'Publish page aswell'} value={`${publish}`} onChange={() => setPublish(!publish)}></WhpptCheckbox>
        <div className="whppt-confirmation-popup-content__children--actions">
          <WhpptButton secondary={true} text={'Cancel'} onClick={() => callback()} />
          <WhpptButton text={'Confirm'} onClick={() => confirm()} />
        </div>
      </div>
    </ConfirmationPopup>
  );
};
