import Cookies from 'js-cookie';
import { User } from './Model';
import { WhpptHttp } from '../Api/Http';

// import { HttpError } from "../HttpError";

export type SecurityApi = {
  verify: () => Promise<User>;
  login: (loginArgs: LoginArgs) => Promise<User>;
  setPassword: (loginArgs: SetPasswordArgs) => Promise<{}>;
};
export type LoginArgs = {
  username: string;
  password: string;
};
export type SetPasswordArgs = {
  email: string;
  password: string;
  token: string;
};
export type SecurityApiConstructor = ({ http }: { http: WhpptHttp }) => SecurityApi;

export const SecurityApi: SecurityApiConstructor = ({ http }) => {
  return {
    verify() {
      return http.secure.getJson<{ user: User }>({ path: '/api/user/me' }).then(data => data.user);
    },
    login(loginArgs) {
      return http.secure.postJson<LoginArgs, { token: string }>({ path: '/api/user/login', data: loginArgs }).then(data => {
        Cookies.set('authToken', data.token, { expires: 3 }); // expires is set in days
        return http.secure.getJson<{ user: User }>({ path: '/api/user/me' }).then(data => data.user);
      });
    },
    setPassword(args) {
      return http.secure.postJson<SetPasswordArgs, {}>({ path: '/user/setPassword', data: args });
    },
  };
};
