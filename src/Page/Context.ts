import { PageData } from "src/Page/Model/Page";
import { PageSettings } from "./Model/PageSettings";

export const defaultState = {} as PageData;

export const defaultPageSettingsState = {
  visible: false,
  activeTab: "general",
  settings: {
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
};

export type PageContextArgs = {
  page: PageData;
  setPage: (val: PageData) => void;
  pageSettings: PageSettings;
  setPageSettings: (val: PageSettings) => void;
};

export const defaultArgs = {
  page: { _id: "" },
  setPage: () => {},
  pageSettings: defaultPageSettingsState,
  setPageSettings: () => {},
} as PageContextArgs;

export const Context = ({
  page,
  setPage,
  pageSettings,
  setPageSettings,
}: PageContextArgs) => {
  return {
    page,
    setPage,
    pageSettings,
    setPageSettings,
    togglePageSettings: (visible?: boolean) =>
      setPageSettings({
        ...pageSettings,
        visible: typeof visible === "boolean" ? visible : !pageSettings.visible,
      }),
    changePageSettingsActiveTab: (activeTab: string) =>
      setPageSettings({ ...pageSettings, activeTab }),
  };
};
