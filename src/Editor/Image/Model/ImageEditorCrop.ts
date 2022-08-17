import { AspectRatio } from './ApectRatio';
import { CropOrientation } from './ImageData';

export type CropConfig = {
  name: string;
  aspectRatio?: AspectRatio;
  orientation?: CropOrientation;
};
