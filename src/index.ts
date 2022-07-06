export * from "./Editor";
export * from "./Context";
export * from "./App";
export * from "./editors/PlainText";
export * from "./Page";
export * from "./editors/RichText";
export * from "./editors/FormattedText";
export * from "./editors/List";
export * from "./Site";

export type WhpptEditorArgs = {
  value: any | string;
  onChange: (value: any | string) => void;
  initalValue?: any;
};
