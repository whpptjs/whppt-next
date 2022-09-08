import React, { FC } from 'react';
import { getFileUrlFromGalleryItem, useWhppt } from '../../index';
import { Gallery } from '../../Gallery';
import { WhpptInput, WhpptLinkData, WhpptTab } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';

export const FileLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({ value, onChange }) => {
  const { toggleGalleryPanel } = useWhppt();

  return (
    <div className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id="whppt-editor-link-text"
          label="Text to show in the link"
          type="text"
          error=""
          info=""
          value={value.text}
          onChange={text => onChange({ ...value, text })}
        />
        <div className="whppt-form__content--info whppt-form__content--break">Current File Selected: {value.href}</div>
        <button
          className="whppt-image-editor-panel__gallery-actions__button"
          onClick={() => {
            toggleGalleryPanel({
              key: 'gallery',
              activeTab: 'doc',
              component: <Gallery onUse={file => onChange({ ...value, href: getFileUrlFromGalleryItem(file) })} />,
            });
          }}>
          {'Choose a different File'}
        </button>
      </section>
    </div>
  );
};
