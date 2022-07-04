import { Domain } from "../App/Model";
import { WhpptHttp } from "../Api/Http";

export type AppApi = {
  domain: {
    loadForCurrentHost: () => Promise<Domain>;
    list: () => Promise<Domain[]>;
    save: (domain: Domain) => Promise<{ domain: Domain }>;
  };
};
export type AppApiConstructor = ({ http }: { http: WhpptHttp }) => AppApi;

export const AppApi: AppApiConstructor = ({ http }) => {
  return {
    domain: {
      loadForCurrentHost() {
        return http.secure
          .getJson<Domain>({
            path: "/config/loadDomainForClient",
          })
          .then((domain) => {
            console.log("🚀 ~ file: Api.ts ~ line 22 ~ .then ~ domain", domain)
            if (!domain) throw new Error("Domain not found");
            return domain;
          });
      },
      list() {
        console.log("🚀 ~ file: Api.ts ~ line 28 ~ list ~ Domain")
        return http.secure.getJson<Domain[]>({ path: "/config/loadDomains" });
      },
      save(domain: Domain) {
        return http.secure.postJson({
          path: "/config/saveDomain",
          data: { domain },
        });
      },
    },
  };
};
