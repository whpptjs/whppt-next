export type WhpptImageData = {
  [key: string]: WhpptImageCrop;
};

export type WhpptImageCrop = {
  altText?: string;
  caption?: string;
  galleryItemId: string;
  aspectRatio: {
    label: string;
    ratio: {
      w: number;
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
