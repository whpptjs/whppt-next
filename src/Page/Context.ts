import { PageData } from 'src/Page/Model/Page';

export const defaultState = {} as PageData;

export type PageContextArgs = {
  page: PageData;
  setPage: (val: PageData) => void;
};

export const defaultArgs = {
  page: { _id: '' },
  setPage: () => {},
} as PageContextArgs;

export const Context = ({ page, setPage }: PageContextArgs) => {
  return {
    page,
    setPage,
  };
};
