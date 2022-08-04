import { PageSettingsData } from 'src/CommonSettings/Model/SettingsData';

export type PageData = {
  _id: string;
  slug?: string;
  settings?: PageSettingsData;
};

export const Page = values => values as PageData;
