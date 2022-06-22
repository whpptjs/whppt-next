import { createContext } from "react";

export const Whppt = createContext<{
  editing: boolean;
  toggleEditing: () => void;
  editorState: {
    editor: string;
    value: any;
    onChange: (value: any) => void;
  };
  showEditor: (
    editor: string,
    value: any,
    onChange: (value: any) => void
  ) => void;
}>({
  editing: false,
  toggleEditing: () => {},
  editorState: {
    editor: "",
    value: undefined,
    onChange: () => {},
  },
  showEditor: () => {},
});
