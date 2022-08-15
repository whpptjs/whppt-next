export type Nav<T> = {
  domainId: string;
  lastModiefied?: Date;
  content?: T;
};

export type NavFactory = {
  new: <T>(domain, content: T) => Nav<T>;
};
export const navFactory: NavFactory = {
  new: <T>(domain, content: T) => ({ domainId: domain._id, content }),
};
