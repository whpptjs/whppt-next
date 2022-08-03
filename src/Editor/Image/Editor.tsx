import React, { FC, ReactElement } from 'react';
import { PageImageData } from '../../Gallery/Model';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export type ImageEditorOptions = EditorOptions & { sizes: string[] };

export const ImageEditor: FC<
  EditorArgs<PageImageData, ImageEditorOptions> & {
    label?: string;
    children: ReactElement | ReactElement[];
  }
> = ({ children, value, label, onChange, options = {} as ImageEditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts = { label: label || 'Image Editor', ...options };
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
