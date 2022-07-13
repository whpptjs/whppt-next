import { Domain } from '../../App/Model';
import { Footer } from '../Model';
import { WhpptHttp } from '../../Api/Http';

export type SiteFooterApi = {
  load: ({ domain }) => Promise<Footer<any>>;
  save: (args: { domain: Domain; footer: Footer<any>; publish: boolean }) => Promise<Footer<any>>;
};
export type SiteFooterApiConstructor = ({ http }: { http: WhpptHttp }) => SiteFooterApi;

export const SiteFooterApi: SiteFooterApiConstructor = ({ http }) => {
  return {
    load: ({ domain }) => {
      if (!domain && domain._id) throw new Error('Invalid Domain');

      return http.secure.getJson<Footer<any>>({
        path: `/site/loadFooter?domainId=${domain._id}`,
      });
    },
    save: ({ domain, footer, publish }) => {
      if (!domain && domain._id) throw new Error('Invalid Domain');

      return http.secure
        .postJson<{ footer: Footer<any>; publish: boolean }, { footer: Footer<any> }>({
          path: '/site/saveFooter',
          data: {
            footer: {
              domainId: domain._id,
              ...footer,
            },
            publish,
          },
        })
        .then(response => response.footer);
    },
  };
};
