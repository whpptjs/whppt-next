import { PageData } from "src/Page/Page";

export const defaultState = {} as PageData;

export type PageSettingsState = {
  visible: boolean;
  activeTab: string;
};

export const defaultPageSettingsState = {
  visible: false,
  activeTab: "general",
};

export type PageContextArgs = {
  page: PageData;
  setPage: (val: PageData) => void;
  pageSettings: PageSettingsState;
  setPageSettings: (val: PageSettingsState) => void;
};

export const defaultArgs = {
  page: { seo: "" },
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
    togglePageSettings: (visible?: boolean) =>
      setPageSettings({
        ...pageSettings,
        visible: typeof visible === "boolean" ? visible : !pageSettings.visible,
      }),
    changePageSettingsActiveTab: (activeTab: string) =>
      setPageSettings({ ...pageSettings, activeTab }),
  };
};
