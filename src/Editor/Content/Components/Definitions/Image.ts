import { ImageComponentData } from '../Image';

export const ImageDefinition = {
  key: 'Image',
  name: 'Image',
  init: (content: ImageComponentData) => content as ImageComponentData,
};
