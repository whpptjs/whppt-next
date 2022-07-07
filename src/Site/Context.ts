import { Footer, Nav, SiteSettings } from "./Model";

export const defaultSiteSettingsState = {
  visible: false,
  activeTab: "general",
};
export const defaultNavState = {} as Nav<any>;
export const defaultFooterState = {} as Footer<any>;

export type SiteContextArgs<N, F> = {
  nav: Nav<N>;
  setNav: (nav: Nav<N>) => void;
  initNav: (nav: N) => N;
  footer: Footer<F>;
  setFooter: (footer: Footer<F>) => void;
  initFooter: (footer: F) => F;
  siteSettings: SiteSettings;
  setSiteSettings: (siteSettings: SiteSettings) => void;
};

export const defaultArgs = {
  nav: { domainId: "" },
  setNav: () => {},
  initNav: () => ({}),
  footer: { domainId: "" },
  setFooter: () => {},
  initFooter: () => {},
  siteSettings: defaultSiteSettingsState,
  setSiteSettings: () => {},
} as SiteContextArgs<any, any>;

export const Context = <N, F>(args: SiteContextArgs<N, F>) => {
  return {
    ...args,
    initNav: args.initNav || defaultArgs.initNav,
    initFooter: args.initFooter || defaultArgs.initFooter,
    toggleSiteSettings: (visible?: boolean) =>
      args.setSiteSettings({
        ...args.siteSettings,
        visible:
          typeof visible === "boolean" ? visible : !args.siteSettings.visible,
      }),
    changeSiteSettingsActiveTab: (activeTab: string) => {
      args.setSiteSettings({ ...args.siteSettings, activeTab });
    },
  };
};
