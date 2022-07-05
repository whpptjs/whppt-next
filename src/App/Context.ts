import { Domain } from "./Model";

export const defaultState = {} as Domain;

export type AppSettingsState = {
  visible: boolean;
  activeTab: string;
};

export const defaultAppSettingsState = {
  visible: false,
  activeTab: "domain",
};

export type AppContextArgs = {
  domain: Domain;
  setDomain: (val: Domain) => void;
  appSettings: AppSettingsState;
  setAppSettings: (val: AppSettingsState) => void;
};

export const defaultArgs = {
  domain: {
    name: "",
    hostNames: [],
    createdAt: new Date(),
    published: false,
  },
  setDomain: () => { },
  appSettings: defaultAppSettingsState,
  setAppSettings: () => { },
}  as AppContextArgs;

export const Context = ({ domain, setDomain,appSettings,setAppSettings }: AppContextArgs) => {
  return {
    domain,
    setDomain,
    appSettings,
    setAppSettings,
    toggleAppSettings: (visible?:boolean) => setAppSettings({ ...appSettings, visible: typeof visible=== 'boolean' ? visible : !appSettings.visible }),
    changeAppSettingsActiveTab: (activeTab: string) =>setAppSettings({ ...appSettings, activeTab }),
  };
};
