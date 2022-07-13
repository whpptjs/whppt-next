import { PageData } from './Model/Page';
import { WhpptHttp } from '../Api/Http';
import { Domain } from '../App/Model';

export type PageApi = {
  loadFromSlug: ({ slug, collection, domain }: { slug: string; collection: string; domain: Domain }) => Promise<PageData>;
  checkSlug: ({ slug, collection, domain }: { slug: string; collection?: string; domain: Domain }) => Promise<PageData>;
  save: ({ page, publish, collection }: { page: PageData; publish?: boolean; collection?: string }) => Promise<PageData>;
};
export type PageApiConstructor = ({ http }: { http: WhpptHttp }) => PageApi;

export const PageApi: PageApiConstructor = ({ http }) => {
  return {
    loadFromSlug: ({ slug, collection = 'pages', domain }) => {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      return http.secure.getJson<PageData>({ path: `/page/load?slug=${slug}&collection=${collection}&domainId=${domain._id}` });
    },
    delete(page: PageData) {
      return http.secure.postJson({
        path: '/page/deletePage',
        data: { _id: page._id },
      });
    },
    checkSlug({ slug, collection = 'pages', domain }) {
      return http.secure.postJson({
        path: '/page/checkSlug',
        data: { slug, collection, domainId: domain._id },
      });
    },
    save({ page, publish = false, collection = 'pages' }) {
      return http.secure.postJson({
        path: '/page/save',
        data: { page, collection, publish },
      });
    },
  };
};
