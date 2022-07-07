import { Domain } from "src/App/Model";
import { Nav } from "src/Site/Model";
import { WhpptHttp } from "../../Api/Http";

export type SiteNavApi = {
  load: ({ domain }) => Promise<Nav<any>>;
  save: (args: { domain: Domain; nav: Nav<any> }) => Promise<Nav<any>>;
};
export type SiteNavApiConstructor = ({
  http,
}: {
  http: WhpptHttp;
}) => SiteNavApi;

export const SiteNavApi: SiteNavApiConstructor = ({ http }) => {
  return {
    load: ({ domain }) => {
      console.log("🚀 ~ file: nav.ts ~ line 18 ~ domain", domain);
      if (!domain && domain._id) throw new Error("Invalid Domain");

      return http.secure.getJson<Nav<any>>({
        path: `/site/loadNav?domainId=${domain._id}`,
      });
    },
    save: ({ domain, nav }) => {
      if (!domain && domain._id) throw new Error("Invalid Domain");

      return http.secure
        .postJson<{ nav: Nav<any> }>({
          path: "/site/saveNav",
          data: {
            nav: {
              domainId: domain._id,
              ...nav,
            },
          },
        })
        .then((response) => response.nav);
    },
  };
};
