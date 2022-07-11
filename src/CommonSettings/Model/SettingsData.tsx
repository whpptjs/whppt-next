export type SettingsData = {
  twitter: {
    title: string;
    description: string;
    keywords: string[];
  },
  seo: {
    title: string;
    description: string;
    keywords: string[];
  },
  og: {
    title: string;
    description: string;
    keywords: string[];
  }
};

export const SettingsData = (values) => values as SettingsData;
export const PageSettingsData = (values) =>  values as SettingsData;