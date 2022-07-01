import { Page } from "src/Models/Page";

export const defaultState = {} as Page;

export type PageContextArgs = {
  page: Page;
  setPage: (val: Page) => void;
};

export const defaultArgs = {
  page: {},
  setPage: () => {},
} as PageContextArgs;

export const Context = ({ page, setPage }: PageContextArgs) => {
  return {
    page,
    setPage,
  };
};
