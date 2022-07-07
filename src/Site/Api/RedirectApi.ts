
import { Redirect } from "src/Site/Model";
import { WhpptHttp } from "../../Api/Http";

export const RedirectApi = (http: WhpptHttp) => ({
  load: ({ page, size, domainId, search }) => {
    return http.secure.getJson<{redirects: Redirect[], total: number}>({
      path: `/siteSettings/loadRedirects?domainId=${domainId}&page=${page}&size=${size}&sarch=${search}`,
    });
  },
  save: (redirect: Redirect) => {
    if (!redirect) throw new Error("Invalid redirect");

    return http.secure
      .postJson<{redirect: Redirect}>({
        path: "/siteSettings/saveRedirect",
        data: {
          redirect: {...redirect}
        },
      })
      .then((redirect) => redirect);
  },
});