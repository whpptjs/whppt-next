import React, { FC, ReactElement } from 'react';
import { ListEditorOptions } from '../editors/List';
import { useWhppt } from '../Context';

export const ListEditor: FC<{
  value: any;
  onChange: (value: any) => void;
  options: ListEditorOptions;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, value, options, onChange }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor('list', value, onChange, options)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
