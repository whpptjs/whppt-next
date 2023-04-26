import React, { FC } from 'react';
import { EditorArgs } from '../EditorArgs';
import { WhpptInput } from '../../ui/components';
import { ImageEditorOptions } from '../Editors';
import { WhpptImageData } from '../Image/Model';

export const WhpptVideoEditorPanel: FC<EditorArgs<WhpptImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  console.log('🚀 ~ file: Panel.tsx:8 ~ options:', options);
  console.log('🚀 ~ file: Panel.tsx:8 ~ value:', value);
  return (
    <div className="whppt-image-editor-panel">
      <div>
        <WhpptInput
          value={''}
          onChange={text => {
            console.log('🚀 ~ file: Panel.tsx:43 ~ text:', text);
            onChange({});
          }}
          id={'altText'}
          label={'Alt text'}
          info="Enter alt text for this image"
          error={''}
          type={'text'}
          name="altText"
          placeholder="Alt text"
        />
        <WhpptInput
          value={''}
          onChange={text => {
            console.log('🚀 ~ file: Panel.tsx:43 ~ text:', text);
            onChange({});
          }}
          id={'caption'}
          label={'Caption'}
          info="Enter caption for this image"
          error={''}
          type={'text'}
          name="caption"
          placeholder="Caption"
        />
      </div>
    </div>
  );
};
