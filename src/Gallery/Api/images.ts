import { WhpptHttp } from '../../Api/Http';
import { Image } from '../Model/Image';

export type ImagesApi = {
  loadGallery: (args: { page: string | number; size: string | number }) => Promise<{ images: Image[] }>;
  save: (formData: FormData) => Promise<any>;
  load: (id: string) => Promise<Image>;
  remove: (id: string) => Promise<any>;
};
export type ImagesApiConstructor = ({ http }: { http: WhpptHttp }) => ImagesApi;

export const ImagesApi: ImagesApiConstructor = ({ http }) => ({
  loadGallery: async ({ page, size }) => {
    return http.secure.getJson<{ images: Image[] }>({
      path: `/api/image/loadGallery?limit=${size}&currentPage=${page}`,
    });
  },
  save: async formData => {
    if (!formData) throw new Error('Invalid image');

    return http.secure
      .saveFile<FormData>({
        path: '/img/upload',
        data: formData,
      })
      .then(res => res.json());
  },
  load: async (id: string) => {
    if (!id) throw new Error('Id of image is missing');

    return http.secure.getJson<Promise<Image>>({
      path: `/img/${id}`,
    });
  },
  remove: async (id: string) => {
    if (!id) throw new Error('Id of image is missing');

    return http.secure.postJson({
      path: '/img/remove',
      data: { id },
    });
  },
});
