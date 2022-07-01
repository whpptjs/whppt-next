import React, { FC, useState } from 'react';
import { WhpptInput } from '../../../ui/components/Input';
import { WhpptTab } from '../../index';
import { WhpptButton } from '../../../ui/components/Button';

export const General: FC<WhpptTab> = () => {
  const [slug, setSlug] = useState('');
  const [pageType, setPageType] = useState('');
  const [pageTemplate, setPageTemplate] = useState('');
  //const [isEditingSlug, setIsEditingSlug] = useState(false);

  const error = '';
  const info = '';

  const submit = () => {};

  const duplicatePage = () => {};

  const deletePage = () => {};

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <div>
          <WhpptButton
            text="Duplicate Page"
            icon="duplicate"
            onClick={duplicatePage}
          />
        </div>
        <div>
          <WhpptButton text="Delete Page" icon="bin" onClick={deletePage} />
        </div>
      </section>
      <div className="whppt-form-page-settings__form">
        <section className="whppt-form-section whppt-form-section--bottom-gap">
          <WhpptInput
            id="whppt-plaintext-input"
            label="Page Slug"
            type="text"
            error={error}
            info={info}
            value={slug}
            onChange={setSlug}
          />
          {/* <div className="whppt-plaintext">
            <div className="whppt-label">
              <label>Page Slug</label>
            </div>
            <div className="whppt-form-slug-placeholder">
              <p>{`Current slug: /${slug}`}</p>
            </div>
          </div> */}
          <WhpptButton text="Save New Slug" icon="" onClick={() => {}} />
        </section>

        <section className="whppt-form-section">
          <WhpptInput
            id="whppt-plaintext-input"
            label="Page Type"
            type="text"
            error={error}
            info={info}
            value={pageType}
            onChange={setPageType}
          />
          <WhpptInput
            id="whppt-plaintext-input"
            label="Template"
            type="text"
            error={error}
            info={info}
            value={pageTemplate}
            onChange={setPageTemplate}
          />

          <WhpptButton text="Change Page Type" icon="" onClick={submit} />
        </section>
      </div>
    </form>
  );
};
