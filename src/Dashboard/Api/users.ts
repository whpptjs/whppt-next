import { WhpptHttp } from '../../Api/Http';
import { User } from '../../App/Model/User';

export type UsersApi = {
  load: () => Promise<User[]>;
};
export type UsersApiConstructor = ({ http }: { http: WhpptHttp }) => UsersApi;

export const UsersApi: UsersApiConstructor = ({ http }) => {
  return {
    load: () => {
      return http.secure.getJson<User[]>({
        path: '/user/list',
      });
    },
  };
};
