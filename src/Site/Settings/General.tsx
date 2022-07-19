import React, { FC } from 'react';
import { WhpptHeading } from '../../ui/components/Heading';
import { WhpptButton, WhpptTab } from '../../ui/components';

export const General: FC<WhpptTab> = () => {
  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptHeading text={'Publishing'} />

        <hr className="whppt-site-setings__ruler" />

        <div className="whppt-site-setings__actions">
          <WhpptButton text="Publish Site Settings" onClick={() => {}} />
          <WhpptButton text="Publish Nav" onClick={() => {}} />
          <WhpptButton text="Publish Footer" onClick={() => {}} />
        </div>
      </section>

      <section className="whppt-form-section">
        <WhpptHeading text={'Dependencies'} />

        <hr className="whppt-site-setings__ruler" />

        <WhpptButton text="Save New Slug" onClick={() => {}} />
      </section>
    </form>
  );
};
