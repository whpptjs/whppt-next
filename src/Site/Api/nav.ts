import { Nav } from '../Model';
import { Domain } from '../..//App/Model';
import { WhpptHttp } from '../../Api/Http';

export type SiteNavApi = {
  load: ({ domain }) => Promise<Nav<any>>;
  save: (args: { domain: Domain; nav: Nav<any>; publish: boolean }) => Promise<Nav<any>>;
};
export type SiteNavApiConstructor = ({ http }: { http: WhpptHttp }) => SiteNavApi;

export const SiteNavApi: SiteNavApiConstructor = ({ http }) => {
  return {
    load: ({ domain }) => {
      if (!domain && domain._id) throw new Error('Invalid Domain');

      return http.secure.getJson<Nav<any>>({
        path: `/api/site/loadNav?domainId=${domain._id}`,
      });
    },
    save: ({ domain, nav, publish }) => {
      if (!domain && domain._id) throw new Error('Invalid Domain');

      return http.secure
        .postJson<{ nav: Nav<any>; publish: boolean }, { nav: Nav<any> }>({
          path: '/api/site/saveNav',
          data: {
            nav: {
              domainId: domain._id,
              ...nav,
            },
            publish,
          },
        })
        .then(response => response.nav);
    },
  };
};
