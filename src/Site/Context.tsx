import { Site } from "src/Site/Site";

export const defaultState = {} as Site;

export type SiteSettingsState = {
  visible: boolean;
  activeTab: string;
};

export const defaultSiteSettingsState = {
  visible: false,
  activeTab: "general",
};

export type SiteContextArgs = {
  site: Site;
  setSite: (val: Site) => void;
  siteSettings: SiteSettingsState;
  setSiteSettings: (val: SiteSettingsState) => void;
};

export const defaultArgs = {
  site: {},
  setSite: () => {},
  siteSettings: defaultSiteSettingsState,
  setSiteSettings: () => {},
} as SiteContextArgs;

export const Context = ({
  site,
  setSite,
  siteSettings,
  setSiteSettings,
}: SiteContextArgs) => {
  return {
    site,
    setSite,
    siteSettings,
    toggleSiteSettings: () => {
      console.log("-------", siteSettings);
      setSiteSettings({ ...siteSettings, visible: !siteSettings.visible });
    },
    changeSiteSettingsActiveTab: (activeTab: string) => {
      setSiteSettings({ ...siteSettings, activeTab });
    },
  };
};
