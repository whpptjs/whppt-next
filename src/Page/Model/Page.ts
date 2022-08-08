import { PageSettingsData } from 'src/CommonSettings/Model/SettingsData';

export type PageData = {
  _id: string;
  pageType: string;
  domainId: string;
  slug?: string;
  settings?: PageSettingsData;
  createdAt?: string;
  updatedAt?: string;
  contents: PageContents;
};

export type PageContents = {
  [key: string]: any;
};

export const Page = values => values as PageData;
