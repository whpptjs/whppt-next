import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTab } from '../index';
import { WhpptButton } from './../../ui/components/Button';

export const General: FC<WhpptTab> = () => {
  const [slug, setSlug] = useState('');
  const [pageType, setPageType] = useState('');
  const [pageTemplate, setPageTemplate] = useState('');
  const [isEditingSlug, setIsEditingSlug] = useState(false);

  const error = '';
  const info = '';

  const changePageType = () => {
  }

  const duplicatePage = () => {
  }

  const deletePage = () => {
  }

  return (
    <form className="whppt-form">
      <section className="whppt-form-section">
        {
          isEditingSlug
            ? <WhpptInput
                id="whppt-plaintext-input"
                label="Page Slug"
                type="text"
                error={error}
                info={info}
                value={slug}
                onChange={setSlug}
              />
            : <div className="whppt-plaintext">
                <div className="whppt-label">
                  <label>Page Slug</label>
                </div>
                <div className="whppt-form-slug-placeholder">
                  <p>{`Current slug: /${slug}`}</p>
                </div>
              </div>
        }
        <WhpptButton text="Change Slug" onClick={() => setIsEditingSlug(!isEditingSlug)}/>
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
        <WhpptButton text="Change Page Type" onClick={changePageType}/>
      </section>

      <section className="whppt-section-actions">
        <WhpptButton text="Duplicate Page" onClick={duplicatePage}/>
        <WhpptButton text="Delete Page" onClick={deletePage}/>
      </section>
    </form>
  )
}
