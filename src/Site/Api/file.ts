import { WhpptHttp } from '../../Api/Http';

export type SiteFileApi = {
  load: (args: { page: string | number; size: string | number }) => Promise<{ files: File[]; total: number }>;
  saveFile: (formData: FormData) => Promise<any>;
};
export type SiteFileApiConstructor = ({ http }: { http: WhpptHttp }) => SiteFileApi;

export const SiteFileApi: SiteFileApiConstructor = ({ http }) => ({
  load: async ({ page, size }) => {
    return http.secure.getJson<{ files: File[]; total: number }>({
      path: `/api/file/loadFiles?page=${page}&size=${size}`,
    });
  },
  saveFile: async formData => {
    if (!formData) throw new Error('Invalid file');

    return http.secure.postFile({
      path: '/file/uploadFile',
      fileData: formData,
    });
  },
});
