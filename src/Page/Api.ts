import { Page } from "./Model/Page";
import { WhpptHttp } from "../Api/Http";

export type PageApi = { loadFromSlug: (slug: string) => Promise<Page> };
export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: (slug) => {
      return http.secure.getJson<Page>({ path: slug });
    },
    delete(page: Page) {
      return http.secure.postJson({
        path: "/page/deletePage",
        data: { _id:page._id },
      });
    }
  };
};
