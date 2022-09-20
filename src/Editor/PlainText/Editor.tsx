import React, { FC, ReactElement } from 'react';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';

export const PlainTextEditor: FC<
  EditorArgs<string> & {
    label?: string;
    children?: ReactElement | ReactElement[];
    className?: string;
  }
> = ({ children, value, label, className, onChange, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts = { label: label || 'Plain Text', ...options };
  return (
    <div
      className={['whppt-editor-plain-text whppt-editor-selector', editing ? 'whppt-editor-selector--editing' : ''].join(' ')}
      onClick={e => {
        if (editing) {
          showEditor('plainText', value, onChange, opts);
          e.stopPropagation();
        }
      }}>
      {!value || value === 'undefined' || value === '<p></p>' ? (
        editing ? (
          <div className={className}>Add your text here</div>
        ) : (
          <></>
        )
      ) : children ? (
        children
      ) : (
        <div className={className}>{value}</div>
      )}
    </div>
  );
};
