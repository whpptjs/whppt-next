export type SettingsData = {
  twitter: TwitterData;
  seo: SeoData;
  og: OpenGraphData;
  cookiePopUp: CookiePopUpData;
};
export type PageSettingsData = SettingsData & {
  hideFromSitemap: boolean;
};

export type OpenGraphData = {
  title: string;
  description: string;
  keywords: string[];
};

export type TwitterData = {
  title: string;
  description: string;
  keywords: string[];
};

export type SeoData = {
  title: string;
  description: string;
  keywords: string[];
  priority: string;
  frequency: string;
};

export type CookiePopUpData = {
  title: string;
  message: string;
};

export const SettingsData = values => values as SettingsData;
export const PageSettingsData = values => values as SettingsData;
