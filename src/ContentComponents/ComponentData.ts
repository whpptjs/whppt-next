import { ReactElement } from 'react';

export type ComponentData = {
  _id: string;
  definitionKey: string;
  data: any;
  container: boolean;
  marginTopLarge?: string;
  marginBottomLarge?: string;
  marginTopMedium?: string;
  marginBottomMedium?: string;
  marginTopSmall?: string;
  marginBottomSmall?: string;
  paddingTopLarge?: string;
  paddingBottomLarge?: string;
  paddingTopMedium?: string;
  paddingBottomMedium?: string;
  paddingTopSmall?: string;
  paddingBottomSmall?: string;
  backgroundSettings?: string[];
};

export type ComponentAction = {
  _id: string;
  info: string;
  icon: () => ReactElement;
  isActive?: () => boolean;
  action: (args: { content: ComponentData; onChange: (data: ComponentData) => void }) => void;
};

export type WhpptComponentDefinition = {
  key: string;
  name: string;
  init: (value: any) => {};
  actions?: ComponentAction[];
};

export type ComponentArgs<T> = {
  data: T;
  container?: boolean;
  onChange: (data: T) => void;
};
