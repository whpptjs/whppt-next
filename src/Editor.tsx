import { FC, ReactElement, useContext } from "react";
import { Whppt } from ".";

export const Editor: FC<{
  is: string;
  value: any;
  onChange: (value: any) => void;
  children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
}> = ({ children, is, value, onChange }) => {
  const { showEditor, editing } = useContext(Whppt);
  return (
    <div
      className="whppt-editor"
      onClick={() => showEditor(is, value, onChange)}
    >
      {children({ isEditing: editing })}
    </div>
  );
};
