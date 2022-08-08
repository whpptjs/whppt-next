import { PageData } from 'src/Page/Model/Page';
import { PageSettingsData } from '../CommonSettings/Model/SettingsData';

export const defaultState = {} as PageData;

export const defaultPageSettingsState = {
  visible: false,
  activeTab: 'general',
};
export const defaultPageSettingsData = {
  hideFromSitemap: false,
  twitter: {
    title: '',
    description: '',
    keywords: [],
  },
  seo: {
    title: '',
    description: '',
    keywords: [],
    priority: '',
    frequency: '',
  },
  og: {
    title: '',
    description: '',
    keywords: [],
  },
};

export type PageContextArgs = {
  page: PageData;
  setPage: (val: PageData) => void;
  pageSettingsData: PageSettingsData;
  setPageSettingsData: (settingsData: PageSettingsData) => void;
};

export const defaultArgs = {
  page: { _id: '', header: { type: '' } },
  setPage: () => {},
  pageSettingsData: defaultPageSettingsData,
  setPageSettingsData: () => {},
} as PageContextArgs;

export const Context = ({ page, setPage, pageSettingsData, setPageSettingsData }: PageContextArgs) => {
  return {
    page,
    setPage,
    pageSettingsData,
    setPageSettingsData,
  };
};
