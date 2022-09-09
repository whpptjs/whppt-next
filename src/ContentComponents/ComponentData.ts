export type ComponentData = {
  _id: string;
  definitionKey: string;
  data: any;
};

export type WhpptComponentDefinition = {
  key: string;
  name: string;
  init: (value: any) => {};
};

export type ComponentArgs<T> = {
  data: T;
  onChange: (data: T) => void;
};
