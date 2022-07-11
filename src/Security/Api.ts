import { User } from "./Model";
// import { WhpptHttp } from "../Api/Http";
// import { HttpError } from "../HttpError";

export type VerifyApi = {
  Security: {
    verifyUser: () => Promise<User>;
  };
};
// export type SecurityApiConstructor = ({ http }: { http: WhpptHttp }) => SecurityApi;

// export const SecurityApi: SecurityApiConstructor = ({ http }) => {
//   return {
//       verify() {
//         return http.secure.getJson({path:'/user/me'})
//       },
//       // login(){},
//       // forgottenPassword(){},
//       // createUser(){},
//       // createUser(){},
   
//   };
// };
