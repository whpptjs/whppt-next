import { WhpptHttp } from '../../Api/Http';

export type TaggingApi = {
  fetch: (domainId: string) => Promise<any>;
  filterList: () => Promise<any>;
  filterListSelected: () => Promise<any>;
  save: (tag: any) => Promise<any>;
};

export type TaggingApiConstructor = ({ http }: { http: WhpptHttp }) => TaggingApi;

export const TaggingApi: TaggingApiConstructor = ({ http }) => ({
  save: async tag => {
    return http.secure.postJson<any, any>({
      path: '/api/tagging/save',
      data: tag,
    });
  },
  fetch: async domainId => {
    return http.secure.getJson<Promise<any[]>>({
      path: `api/tagging/fetch?domainId=${domainId}`,
    });
  },
  filterList: async () => {
    return http.secure.getJson<Promise<any>>({
      path: 'api/tagging/filterList',
    });
  },
  filterListSelected: async () => {
    return http.secure.getJson<Promise<any>>({
      path: 'api/tagging/filterListSelected',
    });
  },
});
