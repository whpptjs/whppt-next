import React, { FC } from 'react';
import { useWhppt } from '../../';
import { Gallery } from '../../Gallery';
import { WhpptInput, WhpptLinkData, WhpptTab } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';

export const FileLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({ value, onChange }) => {
  console.log('🚀 ~ file: File.tsx ~ line 8 ~ value', value);
  const { toggleGalleryPanel } = useWhppt();

  const useFile = file => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    onChange({ ...value, href: `${baseUrl}/gallery/file/${file._id}/${file.fileInfo.originalname}` });
  };

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
              component: <Gallery onUse={useFile} />,
            });
          }}>
          {'Choose a different File'}
        </button>
      </section>
    </div>
  );
};
