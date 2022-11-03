export type EditorState = {
  editor: string;
  value: any;
  onChange: (value: any) => void;
  options: any;
};

export const defaultState = {
  editor: '',
  value: {},
  onChange: () => {},
  options: {},
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

export const Context = ({ editing, setEditing, editorState, setEditorState }: EditorContextArgs) => {
  return {
    editing,
    toggleEditing: (value?: boolean) => {
      setEditing(value === undefined ? !editing : value);
    },
    editorState,
    setEditorState,
    hideEditor: () => {
      setEditorState({
        editor: '',
        onChange: () => {},
        value: undefined,
        options: undefined,
      });
    },
    showEditor: (editor: string, value: any, onChange: (value: any) => void, options: any) => {
      // if (!editing) return;
      const internalOnChange = (changedValue: any) => {
        setEditorState({
          editor,
          onChange: internalOnChange,
          value: changedValue,
          options,
        });
        onChange(changedValue);
      };

      setEditorState({
        editor,
        value,
        onChange: internalOnChange,
        options,
      });
    },
  };
};
