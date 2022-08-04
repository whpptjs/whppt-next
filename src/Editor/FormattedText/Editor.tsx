import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import parse from 'html-react-parser';

export const FormattedTextEditor: FC<
  EditorArgs<string> & {
    label?: string;
    children?: ReactElement | ReactElement[];
    className?: string;
  }
> = ({ children, value, onChange, label, options = {} as EditorOptions, className }) => {
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
      {!value || value === 'undefined' || value === '<p></p>' ? (
        editing ? (
          <div className={className}>Add your text here</div>
        ) : (
          <></>
        )
      ) : children ? (
        children
      ) : (
        <div className={className}>{parse(value)}</div>
      )}
    </div>
  );
};
