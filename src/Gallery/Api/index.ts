import { WhpptHttp } from '../../Api/Http';
import { FileDetails } from '../../Api/Http';

export type GalleryFileType = 'image' | 'video' | 'file' | 'lotty' | 'svg';

export type GalleryApi = {
  search: (args: { page: string | number; size: string | number; type: GalleryFileType }) => Promise<{ files: FileDetails[] }>;
  upload: (fileData: FormData) => Promise<FileDetails>;
  save: (details: FileDetails) => Promise<FileDetails>;
  load: (id: string) => Promise<FileDetails>;
  remove: (id: string) => Promise<any>;
};
export type GalleryApiConstructor = ({ http }: { http: WhpptHttp }) => GalleryApi;

export const GalleryApi: GalleryApiConstructor = ({ http }) => ({
  search: async ({ page, size, type }) => {
    return http.secure.getJson<{ files: FileDetails[] }>({
      path: `/api/gallery/search?limit=${size}&currentPage=${page}&type=${type}`,
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

    return http.secure.postJson<FileDetails, FileDetails>({
      path: '/gallery/save',
      data: details,
    });
  },
  load: async (id: string) => {
    if (!id) throw new Error('Id of file is missing');

    return http.secure.getJson<Promise<FileDetails>>({
      path: `/gallery/${id}`,
    });
  },
  remove: async (id: string) => {
    if (!id) throw new Error('Id of file is missing');

    return http.secure.postJson({
      path: '/gallery/remove',
      data: { id },
    });
  },
});
