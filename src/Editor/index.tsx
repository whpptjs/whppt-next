import React, { FC, ReactElement } from "react";
import { useWhppt } from "../Context";

export const Editor: FC<{
  is: string;
  value: any;
  onChange: (value: any) => void;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, is, value, onChange }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className="whppt-editor"
      onClick={() => showEditor(is, value, onChange)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
