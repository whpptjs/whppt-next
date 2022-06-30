import React, { FC } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTab } from '../index';
import { Button } from './../../ui/components/Button';

export const OpenGraph: FC<WhpptTab> = () => {
  const onChange = () => {};
  const error = '';
  const value = '';
  const info = '';

  return (
    <form className="whppt-form">
      <section className="whppt-form-section">
        <WhpptInput
          id="whppt-plaintext-input"
          label="Title"
          type="text"
          error={error}
          info={info}
          value={value}
          onChange={onChange}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label="Keywords"
          type="text"
          error={error}
          info={info}
          value={value}
          onChange={onChange}
        />
         <WhpptInput
          id="whppt-plaintext-input"
          label="Description"
          type="text"
          error={error}
          info={info}
          value={value}
          onChange={onChange}
        />
      </section>

      <section className="whppt-section-actions">
        <Button text="Save Settings"/>
      </section>
    </form>
  );
}
