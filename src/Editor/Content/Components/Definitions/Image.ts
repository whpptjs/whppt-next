import { PageImageData } from '../../../../Gallery/Model';

export type ImageComponentData = {
  image: PageImageData;
};

export const ImageDefinition = {
  key: 'Image',
  name: 'Image',
  init: (content: ImageComponentData) => content as ImageComponentData,
};
