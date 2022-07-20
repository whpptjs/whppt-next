import { FileDetails } from './../Api/Http';
import { GalleryFileType } from './Api';

export type GalleryState = {
  visible: boolean;
  activeTab: string;
  limitType?: GalleryFileType;
  use?: (FileDetails) => void;
};

export const defaultGallerySettingsState = {
  visible: false,
  activeTab: 'images',
};

export type GalleryContextArgs = {
  gallery: GalleryState;
  setGallery: (val: GalleryState) => void;
};

export const defaultArgs = {
  gallery: defaultGallerySettingsState,
  setGallery: () => {},
} as GalleryContextArgs;

export const Context = ({ gallery, setGallery }: GalleryContextArgs) => {
  return {
    gallery,
    showGallery: ({ limitType, use }: { limitType: GalleryFileType; use: (fileDetails: FileDetails) => void }) =>
      setGallery({
        ...gallery,
        visible: !gallery.visible,
        limitType,
        use,
      }),
    hideGallery: () => setGallery({ visible: false, activeTab: 'image' }),
    changeGalleryActiveTab: (activeTab: string) => setGallery({ ...gallery, activeTab }),
  };
};
