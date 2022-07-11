import { WhpptHttp, WhpptStorageHttp } from "../../Api/Http";
import { SiteFooterApi } from "./footer";
import { SiteNavApi } from "./nav";
import { SiteRedirectApi } from "./redirect";
import { SiteFileApi } from "./file";

export type SiteApi = {
  footer: SiteFooterApi;
  nav: SiteNavApi;
  redirect: SiteRedirectApi;
  files: SiteFileApi;
};
export type SiteApiConstructor = ({ http, storageHttp }: { http: WhpptHttp, storageHttp: WhpptStorageHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http, storageHttp }) => {
  return {
    footer: SiteFooterApi({ http }),
    nav: SiteNavApi({ http }),
    redirect: SiteRedirectApi({ http }),
    files: SiteFileApi({ http, storageHttp })
  };
};
