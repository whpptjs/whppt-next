import { ComponentData } from '../ui/Content';

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
  contentsTree: () => ComponentData[][];
  setContentsTree: (val: () => ComponentData[][]) => void;
};

export const defaultArgs = {
  editing: false,
  setEditing: () => {},
  editorState: defaultState,
  setEditorState: () => {},
  contentsTree: () => [],
  setContentsTree: () => {},
} as EditorContextArgs;

export const Context = ({ editing, setEditing, contentsTree, setContentsTree, editorState, setEditorState }: EditorContextArgs) => {
  return {
    editing,
    toggleEditing: (value?: boolean) => {
      setEditing(value === undefined ? !editing : value);
    },
    editorState,
    hideEditor: () => {
      setEditorState({
        editor: '',
        onChange: () => {},
        value: undefined,
        options: undefined,
      });
    },
    contentsTree,
    setContentsTree,
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
