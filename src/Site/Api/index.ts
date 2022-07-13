import { WhpptHttp } from "../../Api/Http";
import { SiteFooterApi } from "./footer";
import { SiteNavApi } from "./nav";
import { SitemapApi } from "./sitemap";

export type SiteApi = {
  footer: SiteFooterApi;
  nav: SiteNavApi;
  sitemap: SitemapApi;
};
export type SiteApiConstructor = ({ http }: { http: WhpptHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http }) => {
  return {
    footer: SiteFooterApi({ http }),
    nav: SiteNavApi({ http }),
    sitemap: SitemapApi({ http }),
  };
};
