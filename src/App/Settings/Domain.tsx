import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptButton, WhpptTab } from '../../ui/components';

export const Domain: FC<WhpptTab> = () => {
  const [slug, setSlug] = useState('');
  const [pageType, setPageType] = useState('');
  const [pageTemplate, setPageTemplate] = useState('');

  const error = '';
  const info = '';

  const submit = () => {};

  const duplicatePage = () => {};

  const deletePage = () => {};

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        {/* <div>
          <WhpptButton
            text="Duplicate Page"
            icon="duplicate"
            onClick={duplicatePage}
          />
        </div>
        <div>
          <WhpptButton text="Delete Page" icon="bin" onClick={deletePage} />
        </div> */}
      </section>
      <div className="whppt-form-page-settings__form">
        <section className="whppt-form-section whppt-form-section--bottom-gap">
          {/* <WhpptInput
            id="whppt-plaintext-input"
            label="Page Slug"
            type="text"
            error={error}
            info="Please enter a value"
            value={slug}
            onChange={setSlug}
          />

          <WhpptButton text="Save New Slug" icon="" onClick={() => {}} /> */}
        </section>
      </div>
    </form>
  );
};
