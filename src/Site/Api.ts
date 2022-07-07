import { WhpptHttp } from "../Api/Http";
import { FooterApi } from "./Api/FooterApi";
import { RedirectApi } from "./Api/RedirectApi";
import { FooterActions } from "./Model/FooterActions";
import { RedirectActions } from "./Model/RedirectActions";

export type SiteApi = {
  footer: FooterActions;
  redirect: RedirectActions;
};

export type SiteApiConstructor = ({ http }: { http: WhpptHttp }) => SiteApi;

export const SiteApi: SiteApiConstructor = ({ http }) => {
  return {
    footer: {
      ...FooterApi(http),
    },
    redirect: {
      ...RedirectApi(http),
    }
  };
};
