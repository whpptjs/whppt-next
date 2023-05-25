import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { WhpptImageData } from '../Image/Model';
import { ImageEditorOptions } from '../Editors';

export const WhpptVideoEditor: FC<
  EditorArgs<WhpptImageData, ImageEditorOptions> & {
    label?: string;
    children: ReactElement | ReactElement[];
  }
> = ({ children, value, onChange }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor-selector"
      onClick={e => {
        if (editing) {
          showEditor('whppt-video', value, onChange, {});
          e.stopPropagation();
        }
      }}>
      {children}
    </div>
  );
};
