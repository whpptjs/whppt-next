import React from 'react';
import { FC } from 'react';
import { ImageEditor } from '../../Editor/Editors';
import { useWhppt } from '../../Context';
import { WhpptImageData } from '../../Editor/Image/ImageData';
import { buildCroppedImgUrl } from '../../Editor/Image/buildCroppedImgUrl';
import { ComponentArgs } from '../ComponentData';

export type ImageComponentData = {
  image: WhpptImageData;
};
export const ImageComponent: FC<ComponentArgs<ImageComponentData>> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <ImageEditor value={data.image} sizes={['desktop', 'tablet', 'mobile']} onChange={val => onChange({ ...data, image: val })}>
        {data.image.desktop ? (
          <img
            alt="test"
            src={buildCroppedImgUrl(data.image.desktop, { width: '200', height: '100' })}
            style={{ width: '200px', height: '100px' }}
          />
        ) : (
          <h1>Select your image</h1>
        )}
      </ImageEditor>
    </div>
  );
};
