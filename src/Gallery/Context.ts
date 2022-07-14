export type GalleryState = {
  visible: boolean;
  activeTab: string;
};

export const defaultGallerySettingsState = {
  visible: false,
  activeTab: 'general',
};

export type GalleryContextArgs = {
  gallerySettings: GalleryState;
  setGallerySettings: (val: GalleryState) => void;
};

export const defaultArgs = {
  gallerySettings: defaultGallerySettingsState,
  setGallerySettings: () => {},
} as GalleryContextArgs;

export const Context = ({ gallerySettings, setGallerySettings }: GalleryContextArgs) => {
  return {
    gallerySettings,
    toggleGallerySettings: (visible?: boolean) =>
      setGallerySettings({
        ...gallerySettings,
        visible: typeof visible === 'boolean' ? visible : !gallerySettings.visible,
      }),
    changeGalleryActiveTab: (activeTab: string) => setGallerySettings({ ...gallerySettings, activeTab }),
  };
};
