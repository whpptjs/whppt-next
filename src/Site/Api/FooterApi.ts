
import { Footer } from "src/Site/Model";
import { WhpptHttp } from "../../Api/Http";

export const FooterApi = (http: WhpptHttp) => ({
  load: ({ domain }) => {
    if (!domain && domain._id) throw new Error("Invalid Domain");

    return http.secure.getJson<Footer<any>>({
      path: `/site/loadFooter?domainId=${domain._id}`,
    });
  },
  save: ({ domain, footer }) => {
    if (!domain && domain._id) throw new Error("Invalid Domain");

    return http.secure
      .postJson<{ footer: Footer<any> }>({
        path: "/site/saveFooter",
        data: {
          footer: {
            domainId: domain._id,
            ...footer,
          },
        },
      })
      .then((response) => response.footer);
  },
});