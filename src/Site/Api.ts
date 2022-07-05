import { Domain } from "src/App/Model";
import { Footer } from "src/Site/Model";
import { WhpptHttp } from "../Api/Http";

export type SiteApi = {
  footer: {
    load: ({ domain }) => Promise<Footer<any>>;
    save: (args: {
      domain: Domain;
      footer: Footer<any>;
    }) => Promise<Footer<any>>;
  };
};
export type SiteApiConstructor = ({ http }: { http: WhpptHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http }) => {
  return {
    footer: {
      load: ({ domain }) => {
        if (!domain && domain._id) throw new Error("Invalid Domain");

        return http.secure.getJson<Footer<any>>({
          path: `/site/loadFooter?domainId=${domain._id}`,
        });
      },
      save: ({ domain, footer }) => {
        if (!domain && domain._id) throw new Error("Invalid Domain");

        return http.secure
          .postJson<{ footer: Footer<any> }>({
            path: "/site/saveFooter",
            data: {
              footer: {
                domainId: domain._id,
                ...footer,
              },
            },
          })
          .then((response) => response.footer);
      },
    },
  };
};
