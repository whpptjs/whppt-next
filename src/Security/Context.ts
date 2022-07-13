import { User } from './Model';

export type SecurityContextArgs = {
  user: User;
  setUser: (user: User) => void;
};

export const defaultArgs = {
  user: { _id: '', name: '', email: '' },
  setUser: () => {},
} as SecurityContextArgs;

export const defaultState = {} as User;

export const Context = ({ user, setUser }: SecurityContextArgs) => {
  return {
    user,
    setUser,
  };
};
