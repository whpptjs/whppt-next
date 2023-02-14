import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { WhpptInput, WhpptLinkData, WhpptTab } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';
import { Gallery } from '../../Gallery';
import { GalleryItem } from '../../Gallery/Model';

export const BuildDocUrl = (id: string, name: string) => {
  const apiKey = process.env.NEXT_PUBLIC_WHPPT_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  return `${baseUrl}/gallery/doc/${id}/${name}?apiKey=${apiKey}`;
};

export const FileLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({ value, onChange }) => {
  const { toggleGalleryPanel } = useWhppt();

  const useImage = (doc: GalleryItem) => {
    onChange({ ...value, href: BuildDocUrl(doc?._id, doc?.fileInfo?.originalname), fileId: doc._id });
  };

  return (
    <form className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id="whppt-editor-link-text"
          label="Text to show in the link"
          type="text"
          value={value.text}
          onChange={text => onChange({ ...value, text })}
        />
        <div className="whppt-form__link">
          File Url:
          {value.fileId && value.href ? (
            <a href={value.href} target="_blank" rel="noreferrer">
              View
            </a>
          ) : (
            ''
          )}
        </div>
        <div
          onClick={() => {
            toggleGalleryPanel({
              key: 'doc',
              activeTab: 'doc',
              component: <Gallery onUse={useImage} />,
            });
          }}>
          <div className="whppt-image-editor-panel__gallery-actions__button">{'Pick from Gallery'}</div>
        </div>
      </section>
    </form>
  );
};
