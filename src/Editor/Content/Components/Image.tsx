import React from 'react';
import { FC } from 'react';
import { ImageEditor } from '../../Editors';
import { useWhppt } from '../../../Context';
import { WhpptImageData } from '../../Image/ImageData';
import { buildCroppedImgUrl } from '../../Image/buildCroppedImgUrl';
import { ComponentData } from '../../../ui/Content';

export type ComponentImageData = ComponentData & {
  image: WhpptImageData;
};

export const ImageComponent: FC<{ data: ComponentImageData; onChange: (value: ComponentImageData) => void }> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <ImageEditor value={data?.image} sizes={['desktop', 'tablet', 'mobile']} onChange={val => onChange({ ...data, image: val })}>
        {data?.image?.desktop ? (
          <img
            alt="test"
            src={buildCroppedImgUrl(data?.image?.desktop, { width: '200', height: '200' })}
            style={{ width: '200px', height: '100px' }}
          />
        ) : (
          <h1>Select your image</h1>
        )}
      </ImageEditor>
    </div>
  );
};
