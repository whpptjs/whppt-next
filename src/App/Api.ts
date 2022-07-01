import { Domain } from "../App/Model";
import { WhpptHttp } from "../Api/Http";

export type AppApi = { domain: { loadForCurrentHost: () => Promise<Domain> } };
export type AppApiConstructor = ({ http }: { http: WhpptHttp }) => AppApi;

export const AppApi: AppApiConstructor = ({ http }) => {
  return {
    domain: {
      loadForCurrentHost: () => {
        return http.secure
          .getJson<Domain>({
            path: "/config/loadDomainForClient",
          })
          .then((domain) => {
            if (!domain) throw new Error("Domain not found");
            return domain;
          });
      },
    },
  };
};
