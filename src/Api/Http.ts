// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
import Cookies from 'js-cookie';
import { GalleryItem } from 'src/Gallery/Model';

export type WhpptGetOptions = { path: string };
export type WhpptPostOptions<T> = { path: string; data: T };
export type WhpptSaveFileOptions = { path: string; fileData: FormData };

export type WhpptHttpMethods = {
  getJson: <T>(options?: WhpptGetOptions) => Promise<T>;
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

export const Http: (baseUrl: string) => WhpptHttp = baseUrl => {
  return {
    secure: {
      getJson: async <T>({ path }: WhpptGetOptions) => {
        const token = Cookies.get('authToken');
        const response = await fetch(buildFullPath(baseUrl, path), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status >= 400) throw new Error(await response.text());
        const json = await response.json();
        return json as T;
      },
      postJson: async <T, R>({ path, data }: WhpptPostOptions<T>) => {
        const token = Cookies.get('authToken');

        const response = await fetch(buildFullPath(baseUrl, path), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        if (response.status >= 400) throw new Error(await response.text());
        const json = await response.json();
        return json as R;
      },
      postFile: async ({ path, fileData }: WhpptSaveFileOptions) => {
        const response = await fetch(buildFullPath(baseUrl, path), {
          method: 'POST',
          body: fileData as any,
        });
        if (response.status >= 400) throw new Error(await response.text());
        const json = await response.json();
        return json as GalleryItem;
      },
    },
  };
};
