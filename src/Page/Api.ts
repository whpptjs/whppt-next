import { PageData } from "./Page";
import { WhpptHttp } from "../Api/Http";

export type PageApi = { loadFromSlug: (slug: string) => Promise<PageData> };
export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: (slug) => {
      return http.secure.getJson<PageData>({ path: slug });
    },
  };
};
