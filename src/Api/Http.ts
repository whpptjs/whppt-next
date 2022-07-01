// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export type WhpptMethodOptions = { path: string };

export type WhpptHttpMethods = {
  getJson: <T>(options?: WhpptMethodOptions) => Promise<T>;
  postJson: <T>(options?: WhpptMethodOptions) => Promise<T>;
};

export type WhpptHttp = {
  secure: WhpptHttpMethods;
};

const buildFullPath = (baseUrl: string, path: string) => {
  const trimmedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.substring(0, baseUrl.length - 1)
    : baseUrl;
  const trimmedPath = path.startsWith("/")
    ? path.substring(1, path.length)
    : path;
  const fullPath = `${trimmedBaseUrl}/${trimmedPath}`;
  return fullPath;
};

export const Http: (baseUrl: string) => WhpptHttp = (baseUrl) => {
  return {
    secure: {
      getJson: async <T>({ path }: WhpptMethodOptions) => {
        const response = await fetch(buildFullPath(baseUrl, path));
        if (response.status >= 400) throw new Error(await response.text());
        const json = await response.json();
        return json as T;
      },
      postJson: async <T>({ path }) => {
        const response = await fetch(buildFullPath(baseUrl, path));
        if (response.status >= 400) throw new Error(await response.text());
        const json = await response.json();
        return json as T;
      },
    },
  };
};
