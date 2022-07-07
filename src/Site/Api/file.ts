import { WhpptHttp } from "../../Api/Http";

export type SiteFileApi = {
  load: (args: {
    page: string | number;
    size: string | number;
  }) => Promise<{files: File[], total: number}>;
  save: (file: FormData) => Promise<FormData>
};
export type SiteFileApiConstructor = ({
  http,
}: {
  http: WhpptHttp;
}) => SiteFileApi;

export const SiteFileApi: SiteFileApiConstructor = ({http}) => ({
  load: ({ page, size }) => {
    return http.secure.getJson<{files: File[], total: number}>({
      path: `/file/loadFiles?page=${page}&size=${size}`,
    });
  },
  save: (formData) => {
    if (!formData) throw new Error("Invalid file");

    return http.secure
      .postJson<FormData>({
        path: "/file/uploadFile",
        data: formData,
      })
      .then((file) => file);
  },
});