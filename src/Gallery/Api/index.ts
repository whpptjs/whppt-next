import { WhpptHttp } from '../../Api/Http';
import { FileDetails, joinQueryTags } from '../../Api/Http';
import { GalleryFileType } from '../Model';

export type GalleryApi = {
  search: (args: {
    type: GalleryFileType;
    domainId: string;
    page?: string | number;
    size?: string | number;
    tags?: string[];
    filter?: string;
  }) => Promise<{ items: FileDetails[] }>;
  upload: (fileData: FormData) => Promise<FileDetails>;
  save: (details: FileDetails) => Promise<{ item: FileDetails }>;
  load: (id: string) => Promise<{ item: FileDetails }>;
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

    return http.secure.getJson<{ items: FileDetails[] }>({
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

    return http.secure.postJson<{ item: FileDetails }, { item: FileDetails }>({
      path: '/api/gallery/save',
      data: {
        item: details,
      },
    });
  },
  load: async (id: string) => {
    if (!id) throw new Error('Id of file is missing');

    return http.secure.getJson<Promise<{ item: FileDetails }>>({
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
