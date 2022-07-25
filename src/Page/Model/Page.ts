import { SettingsData } from 'src/CommonSettings/Model/SettingsData';

export type PageData = {
  _id: string;
  crops?: Crop[];
};

export type Crop = {
  galleryItemId: '';
  label: string;
  aspectRatio: { label: string; ratio: { w: number; h: number } };
  orientation: 'landscape' | 'portrait';
};

export const Page = values => values as PageData;
