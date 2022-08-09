import { WhpptHttp } from '../../Api/Http';
import { joinQueryTags } from '../../Api/Http';
import { GalleryFileType } from '../Model';
import { GalleryItem } from 'src/Gallery/Model';

export type GalleryApi = {
  search: (args: {
    type: GalleryFileType;
    domainId: string;
    page?: string | number;
    size?: string | number;
    tags?: string[];
    filter?: string;
  }) => Promise<{ items: GalleryItem[] }>;
  upload: (fileData: FormData) => Promise<GalleryItem>;
  save: (details: GalleryItem) => Promise<{ item: GalleryItem }>;
  load: (id: string) => Promise<{ item: GalleryItem }>;
  remove: (id: string) => Promise<any>;
};
export type GalleryApiConstructor = ({ http }: { http: WhpptHttp }) => GalleryApi;

export const GalleryApi: GalleryApiConstructor = ({ http }) => ({
  search: async ({ domainId, page, size, type, tags, filter }) => {
    const params = [
      `domainId=${domainId}`,
      `limit=${size}`,
      `currentPage=${page}`,
      `type=${type}`,
      joinQueryTags(tags),
      `filterTag=${filter}`,
    ].join('&');

    return http.secure.getJson<{ items: GalleryItem[] }>({
      path: `/api/gallery/search?${params}`,
    });
  },
  upload: async fileData => {
    if (!fileData) throw new Error('Invalid file data');

    return http.secure.postFile({
      path: '/gallery/upload',
      fileData,
    });
  },
  save: async details => {
    if (!details) throw new Error('Invalid file details');

    return http.secure.postJson<{ item: GalleryItem }, { item: GalleryItem }>({
      path: '/api/gallery/save',
      data: {
        item: details,
      },
    });
  },
  load: async (id: string) => {
    if (!id) throw new Error('Id of file is missing');

    return http.secure.getJson<Promise<{ item: GalleryItem }>>({
      path: `/api/gallery/load?itemId=${id}`,
    });
  },
  remove: async (itemId: string) => {
    if (!itemId) throw new Error('Id of file is missing');

    return http.secure.postJson({
      path: '/api/gallery/remove',
      data: { itemId },
    });
  },
});
