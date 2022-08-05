import { GalleryItem } from './GalleryItem';

export type ImageItemData = GalleryItem & {
  tags: string[];
  suggestedTags: string[];
  defaultAlt: string;
  defaultCaption: string;
};

export type PageImageItemData = {
  [key: string]: ImageItemDataSize;
};

export type ImageItemDataSize = {
  altText?: string;
  caption?: string;
  galleryItemId: string;
  aspectRatio: {
    label: string;
    ratio: {
      w: Number;
      h: number;
    };
  };
  orientation: 'landscape' | 'portrait' | undefined;
  coords?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};
