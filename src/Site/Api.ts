import { Domain } from "src/App/Model";
import { Footer } from "src/Site/Model";
import { Redirect } from "src/Site/Model";
import { WhpptHttp } from "../Api/Http";

export type SiteApi = {
  footer: {
    load: ({ domain }) => Promise<Footer<any>>;
    save: (args: {
      domain: Domain;
      footer: Footer<any>;
    }) => Promise<Footer<any>>;
  };
  redirect: {
    load: (args: {
      page: string | number;
      size: string | number;
      domainId: string;
      search?: string;
    }) => Promise<{redirects: Redirect[], total: number}>;
    save: (redirect: Redirect) => Promise<{redirect: Redirect}>
  }
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
    redirect: {
      load: ({ page, size, domainId, search }) => {
        return http.secure.getJson<{redirects: Redirect[], total: number}>({
          path: `/siteSettings/loadRedirects?domainId=${domainId}&page=${page}&size=${size}&sarch=${search}`,
        });
      },
      save: (redirect: Redirect) => {
        if (!redirect) throw new Error("Invalid redirect");

        return http.secure
          .postJson<{redirect: Redirect}>({
            path: "/siteSettings/saveRedirect",
            data: {
              redirect: {...redirect}
            },
          })
          .then((redirect) => redirect);
      }
    }
  };
};
