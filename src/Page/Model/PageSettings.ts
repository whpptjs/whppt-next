export type PageSettings = {
  visible: boolean;
  activeTab: string;
};

export const PageSettings = (values) => values as PageSettings;