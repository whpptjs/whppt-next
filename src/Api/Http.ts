// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
import Cookies from 'js-cookie';
import { GalleryItem } from 'src/Gallery/Model';
import { HttpError } from '../HttpError';

export type WhpptGetOptions = { path: string; headers?: {} };
export type WhpptPostOptions<T> = { path: string; data: T };
export type WhpptSaveFileOptions = { path: string; fileData: FormData };

export type WhpptHttpMethods = {
  getJson: <T>(options?: WhpptGetOptions) => Promise<T>;
  getText: (options?: WhpptGetOptions) => Promise<string>;
  postJson: <T, R>(options?: WhpptPostOptions<T>) => Promise<R>;
  postFile: (options?: WhpptSaveFileOptions) => Promise<GalleryItem>;
};

export type WhpptHttp = {
  secure: WhpptHttpMethods;
};

const buildFullPath = (baseUrl: string, path: string) => {
  const trimmedBaseUrl = baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
  const trimmedPath = path.startsWith('/') ? path.substring(1, path.length) : path;
  const fullPath = `${trimmedBaseUrl}/${trimmedPath}`;
  return fullPath;
};

export const joinQueryTags = (tags: string[]) => {
  if (!tags) return '';

  let tagsQuery = '';

  tags.forEach(tag => {
    tagsQuery += `&queryTags[]=${tag}`;
  });

  return tagsQuery;
};

const apiKey = process.env.NEXT_PUBLIC_WHPPT_API_KEY;
export const appendApiKey = (path: string) => {
  if (!apiKey) return path;
  if (path.indexOf('?') < 1) return `${path}?apiKey=${apiKey}`;
  return `${path}&apiKey=${apiKey}`;
};

export const Http: (baseUrl: string) => WhpptHttp = baseUrl => {
  return {
    secure: {
      getJson: async <T>({ path, headers }: WhpptGetOptions) => {
        const token = Cookies.get('authToken');
        const response = await fetch(appendApiKey(buildFullPath(baseUrl, path)), {
          headers: { Authorization: `Bearer ${token}`, ...(headers || {}) },
        });

        const status = response.status;
        if (response.status >= 400) {
          return response
            .text()
            .then(textResp => {
              try {
                return JSON.parse(textResp);
              } catch (err) {
                throw new Error(textResp);
              }
            })
            .catch(error => {
              throw new HttpError({ status, message: error.error?.message || error.error || error.message });
            });
        }

        const json = await response.json();
        return json as T;
      },
      getText: async ({ path }: WhpptGetOptions) => {
        const token = Cookies.get('authToken');
        const response = await fetch(appendApiKey(buildFullPath(baseUrl, path)), {
          headers: { Authorization: `Bearer ${token}` },
        });

        const status = response.status;
        if (response.status >= 400) {
          const message = await response.text();
          throw new HttpError({ status, message });
        }
        return await response.text();
      },
      postJson: async <T, R>({ path, data }: WhpptPostOptions<T>) => {
        const token = Cookies.get('authToken');

        const response = await fetch(appendApiKey(buildFullPath(baseUrl, path)), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        if (response.status >= 400) {
          const message = await response.text();
          return Promise.reject({ status: response.status, message });
        }
        const json = await response.json();
        return json as R;
      },
      postFile: async ({ path, fileData }: WhpptSaveFileOptions) => {
        const response = await fetch(appendApiKey(buildFullPath(baseUrl, path)), {
          method: 'POST',
          // TODO: this route needs to be secured
          //  headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          body: fileData as any,
        });
        if (response.status >= 400) {
          const message = await response.text();
          return Promise.reject({ status: response.status, message });
        }
        const json = await response.json();
        return json as GalleryItem;
      },
    },
  };
};
