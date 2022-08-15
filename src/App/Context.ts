import { Domain } from './Model';

export type AppContextArgs = {
  domain: Domain;
  setDomain: (val: Domain) => void;
};

export const defaultArgs = {
  domain: {
    name: '',
    hostNames: [],
    createdAt: new Date(),
    published: false,
  },
  setDomain: () => {},
} as AppContextArgs;

export const Context = ({ domain, setDomain }: AppContextArgs) => {
  return {
    domain,
    setDomain,
  };
};
