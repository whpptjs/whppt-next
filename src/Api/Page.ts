import { Page } from "../Models/Page";
import { WhpptHttp } from "./Http";

export type PageApi = { loadFromSlug: (slug: string) => Promise<Page> };
export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: (slug) => {
      return http.secure.postJson<Page>({ path: slug });
    },
  };
};
