import { Page } from "../Page/Page";
import { WhpptHttp } from "./Http";

export type PageApi = { loadFromSlug: (slug: string) => Promise<Page> };
export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: (slug) => {
      return http.secure.getJson<Page>({ path: slug });
    },
  };
};