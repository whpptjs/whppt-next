import { Domain } from "./Model";

export const defaultState = {} as Domain;

export type AppContextArgs = {
  domain: Domain;
  setDomain: (val: Domain) => void;
};

export const defaultArgs = {
  domain: {
    name: "",
    hostnames: [],
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
