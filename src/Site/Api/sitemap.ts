import { compact } from 'lodash';
import { Domain } from '../../App/Model';
import { WhpptHttp } from '../../Api/Http';
export type SitemapData = {
  slug: string;
  updatedAt: Date;
  createdAt: Date;
  published: boolean;
  lastPublished: Date;
  pageType: string;
  template: string;
  frequency: string;
  priority: string;
  hideFromSitemap: boolean;
};

export type SitemapFilter = {
  domain: Domain;
  page: number;
  size: number;
  slug?: string;
  freq?: string;
  pageType?: string;
  priority?: string;
  lastModTo?: Date;
  lastModFrom?: Date;
};

export type SitemapResult = {
  total: number;
  sitemap: SitemapData[];
};

export type SitemapApi = {
  load: (filter: SitemapFilter) => Promise<SitemapResult>;
};
export type SitemapApiConstructor = ({ http }: { http: WhpptHttp }) => SitemapApi;

export const SitemapApi: SitemapApiConstructor = ({ http }) => {
  return {
    load: ({ domain, page, size, slug, freq, pageType, priority, lastModTo, lastModFrom }) => {
      if (!domain && domain._id) throw new Error('Invalid Domain');

      const params = compact([
        domain._id && `domainId=${domain._id}`,
        page && `page=${page}`,
        size && `size=${size}`,
        slug && `slug=${slug}`,
        freq && `freq=${freq}`,
        pageType && `pageType=${pageType}`,
        priority && `priority=${priority}`,
        lastModTo && `lastModTo=${lastModTo}`,
        lastModFrom && `lastModFrom=${lastModFrom}`,
      ]);

      return http.secure.getJson<SitemapResult>({
        path: `/api/site/loadSitemap?${params.join('&')}`,
      });
    },
  };
};
