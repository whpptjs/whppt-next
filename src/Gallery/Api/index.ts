import { WhpptHttp } from '../../Api/Http';
import { FileDetails } from '../../Api/Http';
import { joinQueryTags } from '../../helpers';

export type GalleryFileType = 'image' | 'video' | 'file' | 'lotty' | 'svg';

export type GalleryApi = {
  search: (args: {
    page: string | number;
    size: string | number;
    type: GalleryFileType;
    domainId: string;
    tags: string[];
  }) => Promise<{ items: FileDetails[] }>;
  upload: (fileData: FormData) => Promise<FileDetails>;
  save: (details: FileDetails) => Promise<{ item: FileDetails }>;
  load: (id: string) => Promise<FileDetails>;
  remove: (id: string) => Promise<any>;
};
export type GalleryApiConstructor = ({ http }: { http: WhpptHttp }) => GalleryApi;

export const GalleryApi: GalleryApiConstructor = ({ http }) => ({
  search: async ({ domainId, page, size, type, tags }) => {
    return http.secure.getJson<{ items: FileDetails[] }>({
      path: `/api/gallery/search?domainId=${domainId}&limit=${size}&currentPage=${page}&type=${type}${joinQueryTags(tags)}`,
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

    return http.secure.getJson<Promise<FileDetails>>({
      path: `/api/gallery/load?itemId=${id}`,
    });
  },
  remove: async (id: string) => {
    if (!id) throw new Error('Id of file is missing');

    return http.secure.postJson({
      path: '/api/gallery/remove',
      data: { id },
    });
  },
});
