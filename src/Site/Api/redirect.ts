import { Redirect } from 'src/Site/Model';
import { WhpptHttp } from '../../Api/Http';

export type SiteRedirectApi = {
  load: (args: {
    page: string | number;
    size: string | number;
    domainId: string;
    search?: string;
  }) => Promise<{ redirects: Redirect[]; total: number }>;
  save: (redirect: Redirect) => Promise<Redirect>;
};
export type SiteRedirectApiConstructor = ({ http }: { http: WhpptHttp }) => SiteRedirectApi;

export const SiteRedirectApi: SiteRedirectApiConstructor = ({ http }) => ({
  load: ({ page, size, domainId, search }) => {
    return http.secure.getJson<{ redirects: Redirect[]; total: number }>({
      path: `/api/siteSettings/loadRedirects?domainId=${domainId}&page=${page}&size=${size}&search=${search}`,
    });
  },
  save: (redirect: Redirect) => {
    if (!redirect) throw new Error('Invalid redirect');

    return http.secure
      .postJson<{ redirect: Redirect }, Redirect>({
        path: '/api/siteSettings/saveRedirect',
        data: {
          redirect: { ...redirect },
        },
      })
      .then(redirect => redirect);
  },
});
