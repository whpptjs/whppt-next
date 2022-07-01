import { Page } from "src/Models/Page";

export const defaultState = {} as Page;

export type PageSettingsState = {
  visible: boolean;
  activeTab: string;
};

export const defaultPageSettingsState = {
  visible: false,
  activeTab: "general",
};

export type PageContextArgs = {
  page: Page;
  setPage: (val: Page) => void;
  pageSettings: PageSettingsState;
  setPageSettings: (val: PageSettingsState) => void;
};

export const defaultArgs = {
  page: {},
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
    togglePageSettings: () => {
      console.log("-------", pageSettings);
      setPageSettings({ ...pageSettings, visible: !pageSettings.visible });
    },
    changePageSettingsActiveTab: (activeTab: string) => {
      setPageSettings({ ...pageSettings, activeTab });
    },
  };
};
