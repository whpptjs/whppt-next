export type PageSettings = {
  visible: boolean;
  activeTab: string;
  settings: {
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
  }
};

export const PageSettings = (values) => values as PageSettings;