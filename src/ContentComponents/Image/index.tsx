import React from 'react';
import { FC } from 'react';
import { ImageEditor } from '../../Editor/Editors';
import { useWhppt } from '../../Context';
import { WhpptImageData } from '../../Editor/Image/Model/ImageData';
import { buildCroppedImgUrl } from '../../Editor/Image/buildCroppedImgUrl';
import { ComponentArgs } from '../ComponentData';
import { aspectRatios } from '../../Gallery/Model/ApectRatio';

export type ImageComponentData = {
  image: WhpptImageData;
};
export const ImageComponent: FC<ComponentArgs<ImageComponentData>> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <ImageEditor
        value={data?.image}
        aspectRatio={data?.image?.desktop?.aspectRatio || aspectRatios.at(-1)}
        orientation={data?.image?.desktop?.orientation || 'landscape'}
        sizes={['desktop', 'tablet', 'mobile']}
        onChange={val => onChange({ ...data, image: val })}>
        {data?.image?.desktop ? (
          <>
            <img
              alt={data?.image?.desktop?.altText || ''}
              src={buildCroppedImgUrl(data?.image?.desktop, { width: '200', height: '200' })}
              style={{ width: '200px', height: '100px' }}
            />
            {data?.image?.desktop?.caption ? <figcaption>{data.image.desktop.caption}</figcaption> : <></>}
          </>
        ) : (
          <h1>Select your image</h1>
        )}
      </ImageEditor>
    </div>
  );
};
