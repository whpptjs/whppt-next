import { PageSettingsData } from 'src/CommonSettings/Model/SettingsData';

export type HeaderData = {
  type: string;
};
export type PageData = {
  _id: string;
  slug?: string;
  settings?: PageSettingsData;
  header: HeaderData;
};

export const Page = values => values as PageData;
