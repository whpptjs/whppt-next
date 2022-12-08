import { Domain } from '../../App';
import { PageSettingsData } from '../../CommonSettings/Model/SettingsData';

export type HeaderData<T> = {
  type: string;
  content?: T;
};

export type PageTheme = {
  label: string;
  hexCode?: string;
  value: string;
};

export type PageData = {
  _id?: string;
  pageType: string;
  theme?: PageTheme;
  domainId?: string;
  slug?: string;
  settings?: PageSettingsData;
  createdAt?: string;
  updatedAt?: string;
  content?: any;
  header?: HeaderData<any>;
  tags?: string[];
};

export type PageFactory = {
  new: (domain: Domain) => PageData;
  init: (domain?: Domain, page?: PageData) => PageData;
};

export const pageFactory: PageFactory = {
  new: domain => ({
    domainId: domain._id,
    pageType: 'generic',
    settings: defaultPageSettingsData,
    header: { type: '' },
  }),
  init: (domain, page) => ({
    ...(page || {}),
    pageType: page?.pageType || 'generic',
    domainId: domain?._id,
    settings: page?.settings || defaultPageSettingsData,
    header: page?.header || { type: '' },
  }),
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
