import { Http } from "./Http";
import { AppApi } from "../App/Api";
import { PageApi } from "../Page/Api";
import { SiteApi } from "../Site/Api";

export type WhpptApi = { app: AppApi; site: SiteApi; page: PageApi };
export type WhpptApiConstructor = () => WhpptApi;

const http = Http(process.env.NEXT_PUBLIC_BASE_API_URL);
export const Api: WhpptApiConstructor = () => {
  return {
    app: AppApi({ http }),
    site: SiteApi({ http }),
    page: PageApi({ http }),
  };
};
