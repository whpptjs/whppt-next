import { Domain } from '../App/Model';
import { WhpptHttp } from '../Api/Http';
import { HttpError } from '../HttpError';
import { User } from '../Security/Model';

export type AppApi = {
  domain: {
    loadForCurrentHost: () => Promise<Domain>;
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
      loadForCurrentHost() {
        return http.secure
          .getJson<Domain>({
            path: '/api/config/loadDomainForClient',
          })
          .then(domain => {
            if (!domain) throw HttpError.notFound('Domain not found');
            return domain;
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
