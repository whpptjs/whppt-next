import { Site } from "../Site/Site";
import { WhpptHttp } from "./Http";

export type SiteApi = { loadFromSlug: (slug: string) => Promise<Site> };
export type SiteApiConstructor = ({ http }: { http: WhpptHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http }) => {
  return {
    loadFromSlug: (slug) => {
      return http.secure.postJson<Site>({ path: slug });
    },
  };
};
