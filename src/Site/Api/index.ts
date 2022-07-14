import { WhpptHttp } from '../../Api/Http';
import { SiteFooterApi } from './footer';
import { SiteNavApi } from './nav';
import { SitemapApi } from './sitemap';
import { SiteRedirectApi } from './redirect';
import { SiteFileApi } from './file';

export type SiteApi = {
  footer: SiteFooterApi;
  nav: SiteNavApi;
  sitemap: SitemapApi;
  redirect: SiteRedirectApi;
  files: SiteFileApi;
};
export type SiteApiConstructor = ({ http }: { http: WhpptHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http }) => {
  return {
    footer: SiteFooterApi({ http }),
    nav: SiteNavApi({ http }),
    redirect: SiteRedirectApi({ http }),
    files: SiteFileApi({ http }),
    sitemap: SitemapApi({ http }),
  };
};
