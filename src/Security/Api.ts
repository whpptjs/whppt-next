import { User } from "./Model";
import { WhpptHttp } from "../Api/Http";
import { HttpError } from "../HttpError";

export type VerifyApi = {
  Security: {
    verifyUser: () => Promise<User>;
  };
};
export type SecurityApiConstructor = ({ http }: { http: WhpptHttp }) => SecurityApi;

export const SecurityApi: SecurityApiConstructor = ({ http }) => {
  return {
    domain: {

      verifyUser() {
        // const token = Cookies.get('authToken');
        // if (!token) return commit('LOGIN_USER', null);
        // return this.$axios.$post(`${this.$whppt.apiPrefix}/user/me`).then(({ user }) => {
        //   commit('LOGIN_USER', user);
        // });
        // return http.secure
        //   .postJson<User>({
        //     path: "/user/me",
        //   })
        //   .then((user) => {
        //     if (!user) throw HttpError.notFound("User not found");
        //     return user;
        //   });
      },
   
    },
  };
};
