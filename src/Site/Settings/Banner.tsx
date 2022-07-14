import React, { FC, useState } from 'react';
import { WhpptTab } from '../../ui/components';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptButton } from '../../ui/components/Button';

export const Banner: FC<WhpptTab> = () => {
  const [banner, setBanner] = useState('');

  const publish = () => {};

  const save = () => {};

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id={'Banner'}
          placeholder={'Enter text here'}
          label={'Banner Text'}
          value={banner}
          onChange={setBanner}
          info={''}
          error={''}
          type="text"
        />

        <div className="whppt-site-setings__actions right">
          <WhpptButton text={'Publish'} onClick={publish} />
          <WhpptButton text={'Save'} onClick={save} />
        </div>
      </section>
    </form>
  );
};
