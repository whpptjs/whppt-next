import { SettingsData } from "src/CommonSettings/Model/SettingsData";
import { WhpptHttp } from "../../Api/Http";

export type SiteSettingsApi = {
  load: ({ domain }) => Promise<SettingsData>;
  save: ({domain, settings: SettingsData}) => Promise<SettingsData>
};
export type SiteSettingsApiConstructor = ({
  http,
}: {
  http: WhpptHttp;
}) => SiteSettingsApi;

export const SiteSettingsApi: SiteSettingsApiConstructor = ({http}) => ({
  load: async ({ domain }) => {
    return http.secure.getJson<SettingsData>({
      path: `/siteSettings/loadSiteSettings?domainId=${domain._id}`,
    });
  },
  save: async ({settings, domain}) => {
    if (!settings) throw new Error("Invalid settings");

    return http.secure
      .postJson<any>({
        path: "/siteSettings/saveSiteSettings",
        data: {
          siteSettings: {
            domainId: domain._id,
            ...settings
          }
        },
      })
      .then((settings) => settings);
  },
});