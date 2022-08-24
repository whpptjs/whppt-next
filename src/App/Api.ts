import { Domain } from '../App/Model';
import { WhpptHttp } from '../Api/Http';
import { User } from '../Security/Model';
import { HttpError } from 'src/HttpError';

export type AppApi = {
  domain: {
    loadForHost: ({ hostname }: { hostname: string }) => Promise<Domain>;
    list: () => Promise<Domain[]>;
    save: (domain: Domain) => Promise<{ domain: Domain }>;
    publish: (domain: Domain) => Promise<{ domain: Domain }>;
    unPublish: (domain: Domain) => Promise<{ domain: Domain }>;
  };
  user: {
    create: (user: User) => Promise<string>;
    list: () => Promise<User[]>;
  };
};
export type AppApiConstructor = ({ http }: { http: WhpptHttp }) => AppApi;

export const AppApi: AppApiConstructor = ({ http }) => {
  return {
    domain: {
      loadForHost({ hostname }) {
        return http.secure
          .getJson<Domain>({
            path: `/api/config/loadDomainForHost?hostname=${hostname}`,
          })
          .catch((err: HttpError) => {
            if (err.status === 404) return undefined;
            throw err;
          });
      },
      list() {
        return http.secure.getJson<Domain[]>({ path: '/api/config/loadDomains' });
      },
      publish(domain: Domain) {
        return http.secure.postJson({
          path: '/api/config/publishDomain',
          data: { domain },
        });
      },
      unPublish(domain: Domain) {
        return http.secure.postJson({
          path: '/api/config/unpublishDomain',
          data: { domain },
        });
      },
      save(domain: Domain) {
        return http.secure.postJson({
          path: '/api/config/saveDomain',
          data: { domain },
        });
      },
    },
    user: {
      create(user: User) {
        return http.secure.postJson({
          path: '/api/user/create',
          data: { newUser: user },
        });
      },
      list() {
        return http.secure.getJson<{ users: User[] }>({ path: '/api/user/list' }).then(data => data.users);
      },
    },
  };
};
