import React, { FC, ReactElement } from 'react';
import { BasicEditorOptions } from '../Panels';
import { useWhppt } from '../../Context';

export const PlainTextEditor: FC<{
  value: any;
  onChange: (value: any) => void;
  label?: string;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, value, label, onChange }) => {
  const { editing, showEditor } = useWhppt();
  const options = { label: label || 'Plain Text' } as BasicEditorOptions;
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor('plainText', value, onChange, options)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
