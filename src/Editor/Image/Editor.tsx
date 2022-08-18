import React, { FC, ReactElement } from 'react';
import { WhpptImageCrop, WhpptImageData } from './Model/ImageData';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { AspectRatioObject } from '../../Gallery/Model';

export type ImageEditorOptions = EditorOptions & {
  sizes: string[];
  aspectRatio: AspectRatioObject;
  orientation: WhpptImageCrop['orientation'];
};

export const ImageEditor: FC<
  EditorArgs<WhpptImageData, ImageEditorOptions> & {
    label?: string;
    children: ReactElement | ReactElement[];
    sizes: string[];
    aspectRatio: AspectRatioObject;
    orientation: WhpptImageCrop['orientation'];
  }
> = ({ children, value, label, onChange, sizes, aspectRatio, orientation, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts: ImageEditorOptions = { label: label || 'Image Editor', sizes, aspectRatio, orientation, ...options };
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
