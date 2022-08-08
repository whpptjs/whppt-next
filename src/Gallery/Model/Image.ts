export type WhpptImageData = {
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
