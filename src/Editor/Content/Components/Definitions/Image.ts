import { ImageData } from '../Image';

export const ImageDefinition = {
  key: 'Image',
  name: 'Image',
  init: (content: ImageData) => content as ImageData,
};
