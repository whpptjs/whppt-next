import { PageImageData } from './../../Gallery/Model/Image';

export type PageData = {
  _id: string;
  pageType: string;
  domainId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  contents: PageContents[];
};

export type PageContents = {
  [key: string]: string | Content[];
};

export type Content = {
  title: string;
  image: PageImageData;
};

export const Page = values => values as PageData;
