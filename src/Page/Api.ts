import { PageData } from './Model/Page';
import { WhpptHttp } from '../Api/Http';
import { Domain } from '../App/Model';

export type PageApi = {
  loadFromSlug: ({ slug, collection, domain }: { slug: string; collection: string; domain: Domain }) => Promise<PageData>;
  delete: (page: PageData) => Promise<any>;
  checkSlug: ({ slug, collection, domain }: { slug: string; collection?: string; domain: Domain }) => Promise<PageData>;
  save: ({ page, publish, collection }: { page: PageData; publish?: boolean; collection?: string }) => Promise<PageData>;
};

export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: async ({ slug, collection = 'pages', domain }) => {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      return http.secure.getJson<PageData>({ path: `/api/page/load?slug=${slug}&collection=${collection}&domainId=${domain._id}` });
    },
    delete: async (page: PageData) => {
      return http.secure.postJson({
        path: '/api/page/deletePage',
        data: { _id: page._id },
      });
    },
    checkSlug: async ({ slug, collection = 'pages', domain }) => {
      return http.secure.postJson({
        path: '/api/page/checkSlug',
        data: { slug, collection, domainId: domain._id },
      });
    },
    save: async ({ page, publish = false, collection = 'pages' }) => {
      return http.secure.postJson({
        path: '/api/page/save',
        data: { page, collection, publish },
      });
    },
  };
};
