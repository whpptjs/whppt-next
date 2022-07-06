export type EditorState = {
  editor: string;
  value: any;
  onChange: (value: any) => void;
  initalValue?:any

};

export const defaultState = {
  editor: "",
  value: {},
  onChange: () => {},
  initalValue:{}
} as EditorState;

export type EditorContextArgs = {
  editing: boolean;
  setEditing: (val: boolean) => void;
  editorState: EditorState;
  setEditorState: (val: EditorState) => void;
};

export const defaultArgs = {
  editing: false,
  setEditing: () => {},
  editorState: defaultState,
  setEditorState: () => {},
} as EditorContextArgs;

export const Context = ({
  editing,
  setEditing,
  editorState,
  setEditorState,
}: EditorContextArgs) => {
  return {
    editing,
    toggleEditing: () => {
      setEditing(!editing);
    },
    editorState,
    showEditor: (
      editor: string,
      value: any,
      onChange: (value: any) => void,
      initalValue?:any
    ) => {
      // if (!editing) return;
      const internalOnChange = (changedValue: any) => {
        setEditorState({
          editor,
          onChange: internalOnChange,
          value: changedValue,
          initalValue
        });
        onChange(changedValue);
      };

      setEditorState({
        editor,
        value,
        onChange: internalOnChange,
        initalValue
      });
    },
  };
};
