import React, { FC } from 'react';
import { EditorArgs } from '../EditorArgs';
import { WhpptCheckbox } from '../../ui/components';
import { useWhppt } from '../../Context';
import { Gallery } from '../../Gallery';
import { GalleryItem } from 'src/Gallery/Model/GalleryItem';

export const WhpptVideoEditorPanel: FC<EditorArgs<any, any>> = ({ value, onChange }) => {
  const { toggleGalleryPanel } = useWhppt();

  return (
    <div className="whppt-image-editor-panel">
      <div
        className="whppt-image-editor-panel__cropper--empty"
        onClick={() => {
          toggleGalleryPanel({
            key: 'gallery',
            activeTab: 'video',
            component: <Gallery onUse={(video: GalleryItem) => onChange({ ...value, galleryItemId: video._id })} />,
          });
        }}>
        <button className="whppt-image-editor-panel__gallery-actions__button">{'Pick from Gallery'}</button>
      </div>
      <div>
        <WhpptCheckbox label={'Autoplay'} value={value?.autoplay} onChange={autoplay => onChange({ ...value, autoplay })} />
      </div>
    </div>
  );
};
