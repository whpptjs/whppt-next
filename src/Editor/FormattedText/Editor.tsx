import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export const FormattedTextEditor: FC<
  EditorArgs<string> & {
    label?: string;
    children: ReactElement | ReactElement[];
  }
> = ({ children, value, onChange, label, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className={['whppt-editor-selector', editing ? 'whppt-editor-selector--editing' : ''].join(' ')}
      onClick={e => {
        if (editing) {
          showEditor('formattedText', value, onChange, { label, ...options });
          e.stopPropagation();
        }
      }}>
      {children}
    </div>
  );
};
