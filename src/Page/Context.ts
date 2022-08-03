import { PageData } from 'src/Page/Model/Page';
import { SettingsData } from '../CommonSettings/Model/SettingsData';

export const defaultState = {} as PageData;

export const defaultPageSettingsState = {
  visible: false,
  activeTab: 'general',
};
export const defaultPageSettingsData = {
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
  pageSettingsData: SettingsData;
  setPageSettingsData: (settingsData: SettingsData) => void;
};

export const defaultArgs = {
  page: defaultState,
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
