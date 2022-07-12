import { PageData } from "./Model/Page";
import { WhpptHttp } from "../Api/Http";
import { Domain } from "../App/Model";

export type PageApi = {
  loadFromSlug: ({ slug, collection, domain}: {slug: string, collection:string, domain:Domain}) => Promise<PageData>,
  delete: (page: PageData) => Promise<any>,
  save: (page: PageData) => Promise<PageData>
};
export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: ({slug, collection = 'Page',domain}) => {
      return http.secure.getJson<PageData>({ path: `/page/load?slug=${slug}&collection=${collection}&domainId=${domain._id}` });
    },
    delete(page: PageData) {
      return http.secure.postJson({
        path: "/page/deletePage",
        data: { _id: page._id },
      });
    },
    save: async (page: PageData) => {
      if (!page) throw new Error("Invalid page");

      return http.secure
        .postJson<PageData>({
          path: "/page/save",
          data: page
        })
        .then((page) => page);
    },
  };
};
