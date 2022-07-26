import { SettingsData } from 'src/CommonSettings/Model/SettingsData';

export type PageData = {
  _id: string;
  settings?: SettingsData;
};

export const Page = values => values as PageData;
