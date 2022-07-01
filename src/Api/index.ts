import { AppApi } from "../App/Api";
import { Http } from "./Http";
import { PageApi } from "./Page";

export type WhpptApi = { app: AppApi; page: PageApi };
export type WhpptApiConstructor = () => WhpptApi;

const http = Http(process.env.NEXT_PUBLIC_BASE_API_URL);
export const Api: WhpptApiConstructor = () => {
  return { app: AppApi({ http }), page: PageApi({ http }) };
};
