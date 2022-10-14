import React from 'react';
import { FC } from 'react';
import { ImageEditor } from '../../Editor/Editors';
import { useWhppt } from '../../Context';
import { WhpptImageData } from '../../Editor/Image/Model/ImageData';
import { buildCroppedImgUrl } from '../../Editor/Image/buildCroppedImgUrl';
import { ComponentArgs } from '../ComponentData';

export type ImageComponentData = {
  image: WhpptImageData;
};
export const ImageComponent: FC<ComponentArgs<ImageComponentData>> = ({ data, container, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div
      className={['whppt-image-component', container ? 'container' : '', editing ? 'whppt-content--hovered' : ''].join(' ')}
      onClick={e => e.stopPropagation()}>
      <ImageEditor
        value={data?.image}
        sizes={[{ name: 'desktop' }, { name: 'tablet' }, { name: 'mobile' }]}
        onChange={val => onChange({ ...data, image: val })}>
        {data?.image?.desktop ? (
          <>
            <img alt={data?.image?.desktop?.altText || ''} src={buildCroppedImgUrl(data?.image?.desktop, { width: 200, height: 200 })} />
            {data?.image?.desktop?.caption ? <figcaption>{data.image.desktop.caption}</figcaption> : <></>}
          </>
        ) : (
          <h1>Select your image</h1>
        )}
      </ImageEditor>
    </div>
  );
};
