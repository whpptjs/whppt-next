import { Http } from './Http';
import { AppApi } from '../App/Api';
import { PageApi } from '../Page/Api';
import { SiteApi } from '../Site/Api';
import { SecurityApi } from '../Security/Api';
import { GalleryApi } from './../Gallery/Api/index';
import { TaggingApi } from './../Tagging/Api';

export type WhpptApi = { app: AppApi; site: SiteApi; page: PageApi; security: SecurityApi; gallery: GalleryApi; tagging: TaggingApi };
export type WhpptApiConstructor = () => WhpptApi;

const http = Http(process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000');

export const Api: WhpptApiConstructor = () => {
  return {
    app: AppApi({ http }),
    site: SiteApi({ http }),
    page: PageApi({ http }),
    security: SecurityApi({ http }),
    gallery: GalleryApi({ http }),
    tagging: TaggingApi({ http }),
  };
};
