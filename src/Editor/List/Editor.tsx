import React, { ReactElement } from 'react';
import { ListEditorOptions } from '../Panels';
import { useWhppt } from '../../Context';
import { WhpptIcon } from '../../ui/components';

export type ListEditorProps<T extends object> = {
  value: T[];
  onChange: (value: T[]) => void;
  addNew: () => T;
  displayName?: (item: T) => string;
  children: ReactElement | ReactElement[];
};

export const ListEditor = <T extends object>({ children, value, addNew, displayName, onChange }: ListEditorProps<T>) => {
  const { editing, showEditor } = useWhppt();
  const options = { addNew, displayName } as ListEditorOptions;
  return (
    <div
      className={[
        'whppt-editor-selector whppt-editor-list',
        editing ? 'whppt-editor-selector--editing whppt-editor-list--editing' : '',
      ].join(' ')}
      onClick={e => {
        if (editing) {
          showEditor('list', value, onChange, options);
          e.stopPropagation();
        }
      }}>
      <div>{children}</div>
      <div className="whppt-editor-list__edit">
        {editing && (
          <button className="whppt-editor-list__show-editor">
            <WhpptIcon is="list" />
          </button>
        )}
      </div>
    </div>
  );
};
