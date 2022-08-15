export type Footer<T> = {
  domainId: string;
  lastModiefied?: Date;
  content?: T;
};

export type FooterFactory = {
  new: <T>(domain, content: T) => Footer<T>;
};
export const footerFactory: FooterFactory = {
  new: <T>(domain, content: T) => ({ domainId: domain._id, content }),
};
