import React, { FC, ReactElement } from 'react';
import { BasicEditorOptions } from '../editors/PlainText';
import { useWhppt } from '../Context';

export const PlainTextEditor: FC<{
  value: any;
  onChange: (value: any) => void;
  options: BasicEditorOptions;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, value, options, onChange }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor('plainText', value, onChange, options)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
