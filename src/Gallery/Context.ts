export type GalleryState = {
  visible: boolean;
  activeTab: string;
  imageToCrop: any;
};

export const defaultGallerySettingsState = {
  visible: false,
  activeTab: 'general',
  imageToCrop: null,
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
    toggleGallery: (visible?: boolean) =>
      setGallery({
        ...gallery,
        visible: typeof visible === 'boolean' ? visible : !gallery.visible,
      }),
    changeGalleryActiveTab: (activeTab: string) => setGallery({ ...gallery, activeTab }),
  };
};
