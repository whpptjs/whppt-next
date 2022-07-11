import { PageData } from "src/Page/Model/Page";
import { PageSettings } from "./Model/PageSettings";
import { SettingsData } from '../CommonSettings/Model/SettingsData';

export const defaultState = {} as PageData;

export const defaultPageSettingsState = {
  visible: false,
  activeTab: "general",
};
export const defaultPageSettingsData = {
  twitter: {
    title: "",
    description: "",
    keywords: []
  },
  seo: {
    title: "",
    description: "",
    keywords: []
  },
  og: {
    title: "",
    description: "",
    keywords: []
  }
}

export type PageContextArgs = {
  page: PageData;
  setPage: (val: PageData) => void;
  pageSettings: PageSettings;
  setPageSettings: (val: PageSettings) => void;
  pageSettingsData: SettingsData;
  setPageSettingsData: (settingsData: SettingsData) => void;
};

export const defaultArgs = {
  page: { _id: "" },
  setPage: () => {},
  pageSettings: defaultPageSettingsState,
  setPageSettings: () => {},
  pageSettingsData: defaultPageSettingsData,
  setPageSettingsData: () => {},
} as PageContextArgs;

export const Context = ({
  page,
  setPage,
  pageSettings,
  setPageSettings,
  pageSettingsData,
  setPageSettingsData,
}: PageContextArgs) => {
  return {
    page,
    setPage,
    pageSettings,
    setPageSettings,
    pageSettingsData,
    setPageSettingsData,
    togglePageSettings: (visible?: boolean) =>
      setPageSettings({
        ...pageSettings,
        visible: typeof visible === "boolean" ? visible : !pageSettings.visible,
      }),
    changePageSettingsActiveTab: (activeTab: string) =>
      setPageSettings({ ...pageSettings, activeTab }),
  };
};
