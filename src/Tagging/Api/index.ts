import { WhpptHttp } from '../../Api/Http';

type TaggingArgs = {
  domainId: string;
  tagFilters: {
    include: string[];
    exclude: string[];
    selected: string[];
    ignoreLimit: boolean;
    ignoreSort: boolean;
    limit: string | number;
    sort: {
      fields: { [key: string]: any };
      sortType: string;
      text: string;
    };
  };
};

export type TaggingApi = {
  fetch: (domainId: string) => Promise<any>;
  filterList: (args: TaggingArgs & { headerFilter?: string }) => Promise<any[]>;
  filterListSelected: (args: TaggingArgs) => Promise<any[]>;
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
  filterList: async data => {
    return http.secure.postJson<TaggingArgs, any[]>({
      path: 'api/tagging/filterList',
      data,
    });
  },
  filterListSelected: async data => {
    return http.secure.postJson<TaggingArgs, any[]>({
      path: 'api/tagging/filterListSelected',
      data,
    });
  },
});
