import { PageSettingsData } from 'src/CommonSettings/Model/SettingsData';

export type HeaderData = {
  type: string;
};
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
  header: HeaderData;
};

export const Page = values => values as PageData;
