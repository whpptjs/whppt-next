import { Footer, Nav } from './Model';
import { SettingsData } from '../CommonSettings/Model/SettingsData';

export const defaultSiteSettingsState = {
  visible: false,
  activeTab: 'general',
};

export const defaultSettingsData = {
  twitter: {
    title: '',
    description: '',
    keywords: [],
  },
  seo: {
    title: '',
    description: '',
    keywords: [],
    priority: '',
    frequency: '',
  },
  og: {
    title: '',
    description: '',
    keywords: [],
  },
};

export const defaultNavState = {} as Nav<any>;
export const defaultFooterState = {} as Footer<any>;

export type SiteContextArgs<N, F> = {
  nav: Nav<N>;
  setNav: (nav: Nav<N>) => void;
  footer: Footer<F>;
  setFooter: (footer: Footer<F>) => void;
  settingsData: SettingsData;
  setSettingsData: (settingsData: SettingsData) => void;
};

export const defaultArgs = {
  nav: { domainId: '' },
  setNav: () => {},
  footer: { domainId: '' },
  setFooter: () => {},
  settingsData: defaultSettingsData,
  setSettingsData: () => {},
} as SiteContextArgs<any, any>;

export const Context = <N, F>(args: SiteContextArgs<N, F>) => {
  return {
    ...args,
  };
};
