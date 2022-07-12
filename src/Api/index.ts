import { Http, StorageHttp } from "./Http";
import { AppApi } from "../App/Api";
import { PageApi } from "../Page/Api";
import { SiteApi } from "../Site/Api";
import { SecurityApi } from "../Security/Api";

export type WhpptApi = { app: AppApi; site: SiteApi; page: PageApi, security: SecurityApi };
export type WhpptApiConstructor = () => WhpptApi;

const http = Http(process.env.NEXT_PUBLIC_BASE_API_URL);
const storageHttp = StorageHttp(process.env.NEXT_PUBLIC_STORE_API);

export const Api: WhpptApiConstructor = () => {
  console.log('NEXT_PUBLIC_STORE_API', process.env.NEXT_PUBLIC_STORE_API)
  return {
    app: AppApi({ http }),
    site: SiteApi({ http, storageHttp }),
    page: PageApi({ http }),
    security: SecurityApi({ http }),
  };
};
