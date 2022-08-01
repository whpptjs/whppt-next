export type PageData = {
  _id: string;
  pageType: string;
  domainId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  contents: PageContents;
};

export type PageContents = {
  [key: string]: any;
};

export const Page = values => values as PageData;
