import { PageSettingsData } from 'src/CommonSettings/Model/SettingsData';
import { ComponentData } from '../../ContentComponents';

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
  contents: ComponentData[];
  header: HeaderData;
};

export const Page = values => values as PageData;
