import { CropAspectRatio } from './ApectRatio';

export type CropOrientation = 'landscape' | 'portrait' | undefined;

export type WhpptImageData = {
  [key: string]: WhpptImageCrop;
};

export type WhpptImageCrop = {
  altText?: string;
  caption?: string;
  galleryItemId: string;
  aspectRatio: CropAspectRatio;
  orientation: CropOrientation;
  coords?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};
