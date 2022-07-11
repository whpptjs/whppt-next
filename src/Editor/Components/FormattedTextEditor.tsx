import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../../Context';

export const FormattedTextEditor: FC<{
  value: any;
  onChange: (value: any) => void;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, value, onChange }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor('formattedText', value, onChange, undefined)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
