export type SiteSettings = {
  visible: boolean;
  activeTab: string;
};

export const SiteSettings = values => values as SiteSettings;
