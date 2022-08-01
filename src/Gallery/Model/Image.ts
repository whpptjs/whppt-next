export type ImageData = {
  _id: string;
  fileId: string;
  name: string;
  file: FormData;
  tags: string[];
  suggestedTags: string[];
  date: Date;
  defaultAlt: string;
  defaultCaption: string;
};

export type PageImageData = {
  [key: string]: ImageDataSize;
};

export type ImageDataSize = {
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
  coords: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};
