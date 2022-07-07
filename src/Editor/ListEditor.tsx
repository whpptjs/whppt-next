import React, { FC, ReactElement } from "react";
import { ListEditorOptions } from "../editors/List";
import { useWhppt } from "../Context";

export const ListEditor: FC<{
  value: any;
  onChange: (value: any) => void;
  addNew: <T>() => T;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, value, addNew, onChange }) => {
  const { editing, showEditor } = useWhppt();
  const options = { addNew } as ListEditorOptions;
  return (
    <div
      className="whppt-editor-selector"
      onClick={() => showEditor("list", value, onChange, options)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
