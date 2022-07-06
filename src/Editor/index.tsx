import React, { FC, ReactElement } from 'react';
import { useWhppt } from '../Context';

export const Editor: FC<{
  is: string;
  value: any;
  onChange: (value: any) => void;
  initalValue?: any;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, is, value, initalValue, onChange }) => {
  const { editing, showEditor } = useWhppt();
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ initalValue', initalValue);
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor(is, value, onChange, initalValue)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
