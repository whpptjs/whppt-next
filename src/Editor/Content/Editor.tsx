import React, { ReactElement } from 'react';
import { WhpptComponentDefinition } from '../../ContentComponents/ComponentData';
// import { ContentEditorOptions } from '../Panels';
import { useWhppt } from '../../Context';
import { EditorOptions } from '../EditorOptions';

export type ContentEditorProps<T extends object> = {
  value: T[];
  onChange: (value: T[]) => void;
  containerDefault?: boolean;
  children: ReactElement | ReactElement[];
  componentDefinitions: WhpptComponentDefinition[];
};
export type ContentEditorOptions = EditorOptions & {
  componentDefinitions: WhpptComponentDefinition[];
  containerDefault?: boolean;
};

export const ContentEditor = <T extends object>({
  children,
  value,
  onChange,
  componentDefinitions,
  containerDefault = true,
}: ContentEditorProps<T>) => {
  const { editing, showEditor } = useWhppt();
  const options = { componentDefinitions, containerDefault } as ContentEditorOptions;

  return (
    <div
      className={['whppt-content-selector whppt-editor-selector', editing ? 'whppt-editor-selector--editing' : ''].join(' ')}
      onClick={e => {
        if (editing) {
          showEditor('content', value, onChange, options);
          e.stopPropagation();
        }
      }}>
      {children}
    </div>
  );
};
