<<<<<<< HEAD
import { WhpptHttp, WhpptStorageHttp } from "../../Api/Http";
=======
import { WhpptHttp } from '../../Api/Http';
>>>>>>> using new baseUrl

export type SiteFileApi = {
  load: (args: {
    page: string | number;
    size: string | number;
  }) => Promise<{files: File[], total: number}>;
  saveFile: (formData: FormData) => Promise<any>
};
<<<<<<< HEAD
export type SiteFileApiConstructor = ({
  http,
  storageHttp
}: {
  http: WhpptHttp;
  storageHttp: WhpptStorageHttp;
}) => SiteFileApi;

export const SiteFileApi: SiteFileApiConstructor = ({http, storageHttp}) => ({
  load: ({ page, size }) => {
    return http.secure.getJson<{files: File[], total: number}>({
      path: `/file/loadFiles?page=${page}&size=${size}`,
    });
  },
  saveFile: (formData) => {
    if (!formData) throw new Error("Invalid file");

    return storageHttp.secure
      .saveFile<FormData>({
        path: "/file/uploadFile",
        data: formData,
      })
      .then((file) => file);
=======
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
>>>>>>> using new baseUrl
  },
});
