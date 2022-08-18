import React, { FC, ReactElement } from 'react';
import { WhpptImageData } from './Model/ImageData';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { AspectRatio } from '../../Gallery/Model';

export type ImageEditorOptions = EditorOptions & { sizes: string[]; aspectRatio: AspectRatio };

export const ImageEditor: FC<
  EditorArgs<WhpptImageData, ImageEditorOptions> & {
    label?: string;
    children: ReactElement | ReactElement[];
    sizes: string[];
    aspectRatio: AspectRatio;
  }
> = ({ children, value, label, onChange, sizes, aspectRatio, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts: ImageEditorOptions = { label: label || 'Image Editor', sizes, aspectRatio, ...options };
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
