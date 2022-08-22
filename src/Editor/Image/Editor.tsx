import React, { FC, ReactElement } from 'react';
import { WhpptImageData, CropConfig } from './Model';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export type ImageEditorOptions = EditorOptions & {
  sizes: CropConfig[];
};

export const ImageEditor: FC<
  EditorArgs<WhpptImageData, ImageEditorOptions> & {
    label?: string;
    children: ReactElement | ReactElement[];
    sizes: CropConfig[];
  }
> = ({ children, value, label, onChange, sizes, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts: ImageEditorOptions = { label: label || 'Image Editor', sizes, ...options };
  return (
    <div
      className="whppt-editor-selector"
      onClick={e => {
        if (editing) {
          showEditor('image', value, onChange, opts);
          e.stopPropagation();
        }
      }}>
      {children}
    </div>
  );
};
