import React, { FC } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { Tab } from '../index';
import { Button } from './../../ui/components/Button';

export const General: FC<Tab> = () => {
  const onChange = () => {};
  const error = '';
  const value = '';
  const info = '';

  return (
    <form className="whppt-form">
      <section className="whppt-form-section">
        <WhpptInput
          id="whppt-plaintext-input"
          label="Page Slug"
          type="text"
          error={error}
          info={info}
          value={value || "current slug: /slug"}
          onChange={onChange}
        />
        <Button text="Change Slug"/>
      </section>

      <section className="whppt-form-section">
        <WhpptInput
          id="whppt-plaintext-input"
          label="Page Type"
          type="text"
          error={error}
          info={info}
          value={value}
          onChange={onChange}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label="Template"
          type="text"
          error={error}
          info={info}
          value={value}
          onChange={onChange}
        />
        <Button text="Change Page Type"/>
      </section>

      <section className="whppt-section-actions">
        <Button text="Duplicate Page"/>
        <Button text="Delete Page"/>
      </section>
    </form>
  )
}
