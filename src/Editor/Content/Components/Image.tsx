import React from 'react';
import { FC } from 'react';
import { ImageEditor } from '../../Editors';
import { useWhppt } from '../../../Context';
import { PageImageItemData } from '../../../Gallery/Model/Image';
import { buildCroppedImgUrl } from '../../../helpers';
import { ComponentData } from '../../../ui/Content';

export type ImageData = ComponentData & {
  data: PageImageItemData;
};

export const ImageComponent: FC<{ data: PageImageItemData; onChange: (data: PageImageItemData) => void }> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <ImageEditor value={data} options={{ label: '', sizes: ['desktop', 'mobile'] }} onChange={val => onChange(val)}>
        {data.desktop ? (
          <img
            alt="test"
            src={buildCroppedImgUrl(data.desktop, { width: '200', height: '200' })}
            style={{ width: '200px', height: '100px' }}
          />
        ) : (
          <h1>Select your image</h1>
        )}
      </ImageEditor>
    </div>
  );
};
