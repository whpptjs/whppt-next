import React, { ReactElement } from 'react';
import { ListEditorOptions } from '../Panels';
import { useWhppt } from '../../Context';

export type ListEditorProps<T extends object> = {
  value: T[];
  onChange: (value: T[]) => void;
  addNew: () => T;
  displayName?: (item: T) => string;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
};

export const ListEditor = <T extends object>({
  children,
  value,
  addNew,
  displayName,
  onChange,
}: ListEditorProps<T>) => {
  const { editing, showEditor } = useWhppt();
  const options = { addNew, displayName } as ListEditorOptions;
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor('list', value, onChange, options)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
