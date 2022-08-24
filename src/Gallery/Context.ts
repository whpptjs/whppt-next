import { ReactElement } from 'react';

export type GalleryContextArgs = {
  galleryPanel: GalleryPanel;
  setGalleryPanel: (val: GalleryPanel) => void;
};

export const defaultGalleryPanelState = { key: '', activeTab: 'general' } as GalleryPanel;

export type GalleryPanel = {
  visible?: boolean;
  key: string;
  activeTab: string;
  component: ReactElement;
};

export const defaultArgs = {
  galleryPanel: defaultGalleryPanelState,
  setGalleryPanel: () => {},
} as GalleryContextArgs;

export const Context = ({ galleryPanel, setGalleryPanel }: GalleryContextArgs) => {
  const hideGalleryPanel = () => setGalleryPanel({ ...defaultGalleryPanelState, visible: false });
  return {
    galleryPanel,
    setGalleryPanel,
    showGalleryPanel: (galleryPanel: GalleryPanel) => setGalleryPanel({ ...galleryPanel, visible: true }),
    hideGalleryPanel,
    toggleGalleryPanel: (_galleryPanel: GalleryPanel) => {
      if (_galleryPanel.key === galleryPanel.key) return hideGalleryPanel();
      setGalleryPanel({ ..._galleryPanel, visible: true });
    },
  };
};
