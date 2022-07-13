import { WhpptHttp } from "../../Api/Http";
import { UsersApi } from "./users";

export type DashboardApi = {
  users: UsersApi;
};
export type DashboardApiConstructor = ({ http }: { http: WhpptHttp }) => DashboardApi;

export const DashboardApi: DashboardApiConstructor = ({ http }) => {
  return {
    users: UsersApi({http})
  };
};
