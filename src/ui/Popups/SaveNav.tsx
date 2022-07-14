import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';

import { useWhppt } from '../../Context';
import { WhpptButton, WhpptCheckbox } from '../components';
import { ConfirmationPopup } from '../ConfirmationPopup';

export const SaveNavPopup: FC<{ callback: () => void }> = ({ callback }) => {
  const [publish, setPublish] = useState(false);
  const { api, nav, domain } = useWhppt();

  const confirm = () => {
    const save = api.site.nav.save({ domain, nav, publish }).then(() => {
      callback();
    });
    toast.promise(save, {
      pending: 'Saving...',
      success: `Navigation ${publish ? 'Published' : 'Saved'}`,
      error: `Navigation Failed To ${publish ? 'Publish' : 'Save'} 🤯`,
    });
  };

  return (
    <ConfirmationPopup close={() => callback()} header="Are you sure?">
      <div>
        <div className="whppt-confirmation-popup-content__children--message">Are you sure you want to save the site Navs?</div>
        <WhpptCheckbox label={'Publish nav aswell'} value={`${publish}`} onChange={() => setPublish(!publish)}></WhpptCheckbox>
        <div className="whppt-confirmation-popup-content__children--actions">
          <WhpptButton secondary={true} text={'Cancel'} onClick={() => callback()} />
          <WhpptButton text={'Confirm'} onClick={() => confirm()} />
        </div>
      </div>
    </ConfirmationPopup>
  );
};
