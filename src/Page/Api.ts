import { PageData } from './Model/Page';
import { WhpptHttp } from '../Api/Http';
import { Domain } from '../App/Model';
import { HttpError } from '../HttpError';

export type PageApi = {
  loadFromSlug: ({ slug, collection, domain }: { slug: string; collection: string; domain: Domain }) => Promise<PageData>;
  delete: (page: PageData) => Promise<any>;
  unpublish: (page: PageData, collection?: string) => Promise<void>;
  checkSlug: ({ slug, collection, domain }: { slug: string; collection?: string; domain: Domain }) => Promise<PageData>;
  save: ({ page, publish }: { page: PageData; publish?: boolean }) => Promise<PageData>;
};

export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: async ({ slug, collection = 'pages', domain }) => {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      const queryParams = [`slug=${slug}`, `collection=${collection}`, `domainId=${domain._id}`].join('&');
      return http.secure.getJson<PageData>({ path: `/api/page/load?${queryParams}` }).catch((err: HttpError) => {
        if (err.status === 404) return undefined;
        throw err;
      });
    },
    delete: async (page: PageData, collection = 'pages') => {
      return http.secure.postJson({
        path: '/api/page/delete',
        data: { _id: page._id, collection },
      });
    },
    checkSlug: async ({ slug, collection = 'pages', domain }) => {
      return http.secure.postJson({
        path: '/api/page/checkSlug',
        data: { slug, collection, domainId: domain._id },
      });
    },
    save: async ({ page, publish = false }) => {
      return http.secure.postJson({
        path: '/api/page/save',
        data: { page, publish },
      });
    },
    unpublish: async (page, collection = 'pages') => {
      return http.secure.postJson({
        path: '/api/page/unpublishPage',
        data: { _id: page._id, collection },
      });
    },
  };
};
