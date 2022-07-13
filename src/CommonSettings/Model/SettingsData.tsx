export type SettingsData = {
  twitter: TwitterData;
  seo: SeoData;
  og: OpenGraphData;
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
}

export const SettingsData = (values) => values as SettingsData;
export const PageSettingsData = (values) =>  values as SettingsData;