import { WhpptHttp } from '../../Api/Http';
import { ImagesApi } from './images';

export type GalleryApi = {
  images: ImagesApi;
};
export type GalleryApiConstructor = ({ http }: { http: WhpptHttp }) => GalleryApi;

export const GalleryApi: GalleryApiConstructor = ({ http }) => {
  return {
    images: ImagesApi({ http }),
  };
};
