import { PageSettingsData } from 'src/CommonSettings/Model/SettingsData';

export type HeaderData = {
  type: string;
};
export type PageData = {
  _id?: string;
  pageType: string;
  domainId?: string;
  slug?: string;
  settings?: PageSettingsData;
  createdAt?: string;
  updatedAt?: string;
  contents: PageContents[];
  header: HeaderData;
};

export type PageContents = {
  type: string;
  [key: string]: any;
};

export const Page = values => values as PageData;
