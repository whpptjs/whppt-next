import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../Context';

export const RichTextEditor: FC<{
  value: any;
  onChange: (value: any) => void;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, value, onChange }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor('richText', value, onChange, undefined)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
