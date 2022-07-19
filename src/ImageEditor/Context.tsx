export type ImageEditorState = {
  visible: boolean;
  imageToCrop: any;
};

export const defaultImageEditorState = {
  visible: false,
  imageToCrop: null,
};

export type ImageContextArgs = {
  imageEditor: ImageEditorState;
  setImageEditor: (val: ImageEditorState) => void;
};

export const defaultArgs = {
  imageEditor: defaultImageEditorState,
  setImageEditor: () => {},
} as ImageContextArgs;

export const Context = ({ imageEditor, setImageEditor }: ImageContextArgs) => {
  return {
    imageEditor,
    toggleImageEditor: (visible?: boolean) =>
      setImageEditor({
        ...imageEditor,
        visible: typeof visible === 'boolean' ? visible : !imageEditor.visible,
      }),
    setImageEditor,
  };
};
