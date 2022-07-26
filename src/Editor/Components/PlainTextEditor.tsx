import React, { FC, ReactElement } from 'react';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';

export const PlainTextEditor: FC<
  EditorArgs<string> & {
    label?: string;
    children: ReactElement | ReactElement[];
  }
> = ({ children, value, label, onChange, options = {} as EditorOptions }) => {
  const { showEditor } = useWhppt();
  const opts = { label: label || 'Plain Text', ...options };
  return (
    <div className="whppt-editor-selector" onClick={() => showEditor('plainText', value, onChange, opts)}>
      {children}
    </div>
  );
};
