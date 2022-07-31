import { FileDetails } from './../Api/Http';
import { GalleryFileType } from './Api';

export type GalleryState = {
  visible: boolean;
  activeTab: string;
  limitType?: GalleryFileType;
  device?: string;
  use?: (FileDetails) => void;
};

export const defaultGalleryState = {
  visible: false,
  activeTab: 'image',
  use: () => {},
};

export type GalleryContextArgs = {
  gallery: GalleryState;
  setGallery: (val: GalleryState) => void;
};

export const defaultArgs = {
  gallery: defaultGalleryState,
  setGallery: () => {},
} as GalleryContextArgs;

export const Context = ({ gallery }: GalleryContextArgs) => gallery;
