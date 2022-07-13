import { WhpptHttp } from "../../Api/Http";
import { SiteFooterApi } from "./footer";
import { SiteNavApi } from "./nav";
import { SiteSettingsApi } from "./settings";
import { SiteRedirectApi } from "./redirect";

export type SiteApi = {
  footer: SiteFooterApi;
  nav: SiteNavApi;
  settings: SiteSettingsApi;
  redirect: SiteRedirectApi;
};
export type SiteApiConstructor = ({ http }: { http: WhpptHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http }) => {
  return {
    footer: SiteFooterApi({ http }),
    nav: SiteNavApi({ http }),
    settings: SiteSettingsApi({ http }),
    redirect: SiteRedirectApi({ http })
  };
};
