export * from "./HttpError";
export * from "./Editor";
export * from "./Context";
export * from "./App";
export * from "./Page";
export * from "./ui/components";
export * from "./editors";

export type WhpptEditorArgs = {
  value: any | string;
  onChange: (value: any | string) => void;
  initalValue?: any;
};
