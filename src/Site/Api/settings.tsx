import { SettingsData } from 'src/CommonSettings/Model/SettingsData';
import { WhpptHttp } from '../../Api/Http';

export type SiteSettingsApi = {
  load: ({ domain }) => Promise<SettingsData>;
  save: ({ domain, settings: SettingsData }) => Promise<any>;
  publish: ({ settings }) => Promise<any>;
  publishNav: ({ nav }) => Promise<any>;
  publishFooter: ({ footer }) => Promise<any>;
};
export type SiteSettingsApiConstructor = ({ http }: { http: WhpptHttp }) => SiteSettingsApi;

export const SiteSettingsApi: SiteSettingsApiConstructor = ({ http }) => ({
  load: async ({ domain }) => {
    return http.secure.getJson<SettingsData>({
      path: `/api/siteSettings/loadSiteSettings?domainId=${domain._id}`,
    });
  },
  save: async ({ settings, domain }) => {
    if (!settings) throw new Error('Invalid settings');

    return http.secure
      .postJson({
        path: '/api/siteSettings/saveSiteSettings',
        data: {
          siteSettings: {
            domainId: domain._id,
            ...settings,
          },
        },
      })
      .then(settings => settings);
  },
  publish: async settings => {
    return http.secure.postJson({
      path: '/api/siteSettings/publishSiteSettings',
      data: {
        siteSettings: settings,
      },
    });
  },
  publishNav: async ({ nav }) => {
    return http.secure.postJson({
      path: '/api/site/publishNav',
      data: {
        nav: nav,
      },
    });
  },
  publishFooter: async ({ footer }) => {
    return http.secure.postJson({
      path: '/api/site/publishFooter',
      data: {
        footer: footer,
      },
    });
  },
});
