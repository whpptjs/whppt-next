import { ComponentImageData } from '../Image';

export const ImageDefinition = {
  key: 'Image',
  name: 'Image',
  init: (content: ComponentImageData) => content as ComponentImageData,
};
