import React, { FC } from 'react';
import { Heading } from '../../ui/components/Heading';
import { WhpptButton, WhpptTab } from '../../ui/components';

export const General: FC<WhpptTab> = () => {
  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <Heading text={'Publishing'} />

        <hr className="whppt-site-setings__ruler" />

        <div className="whppt-site-setings__actions">
          <WhpptButton text="Publish Site Settings" onClick={() => {}} />
          <WhpptButton text="Publish Nav" onClick={() => {}} />
          <WhpptButton text="Publish Footer" onClick={() => {}} />
        </div>
      </section>

      <section className="whppt-form-section">
        <Heading text={'Dependencies'} />

        <hr className="whppt-site-setings__ruler" />

        <WhpptButton text="Save New Slug" onClick={() => {}} />
      </section>
    </form>
  );
};
