import { EditorOptions } from './EditorOptions';

export type EditorArgs<T, O extends EditorOptions = EditorOptions> = {
  value: T;
  onChange: (value: T) => void;
  options?: O;
};
