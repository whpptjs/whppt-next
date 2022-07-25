import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export const RichTextEditor: FC<
  EditorArgs<string> & {
    label?: string;
    children: ReactElement | ReactElement[];
  }
> = ({ children, value, onChange, label, options = {} as EditorOptions }) => {
  const { showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor-selector"
      onClick={() =>
        showEditor('richText', value, onChange, {
          label: label || 'Rich Text',
          options,
        })
      }>
      {children}
    </div>
  );
};
