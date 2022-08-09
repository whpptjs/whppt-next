import { ImageComponentData } from '../Image';

export const ImageDefinition = {
  key: 'Image',
  name: 'Image',
  init: (content: ImageComponentData) => {
    return { ...content, image: content.image || {} } as ImageComponentData;
  },
};
