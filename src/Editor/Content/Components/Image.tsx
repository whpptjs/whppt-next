import React from 'react';
import { FC } from 'react';
import { ImageEditor } from '../../Components';
import { useWhppt } from '../../../Context';
import { PageImageData } from '../../../Gallery/Model/Image';
import { buildCroppedImgUrl } from '../../../helpers';
import { WhpptGalleryImage } from '../../../ui/components/GalleryImage';
import { WhpptHeading } from '../../../ui/components';

export const ImageComponent: FC<{ data: PageImageData; onChange: (data: PageImageData) => void }> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <ImageEditor value={data} options={{ sizes: ['desktop', 'mobile'] }} onChange={val => onChange(val)}>
        {data.desktop ? (
          <WhpptGalleryImage
            key={data.desktop.galleryItemId}
            url={buildCroppedImgUrl(data.desktop, { width: 200, height: 200 })}
            name={''}
            style={{ width: '200px', height: '100px' }}
            onClick={() => {}}
            isSelected={false}
          />
        ) : (
          <WhpptHeading text="Select your image" />
        )}
      </ImageEditor>
    </div>
  );
};
