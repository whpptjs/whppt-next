export type Domain = {
  _id?: string;
  name?: string;
  hostNames: string[];
  createdAt: Date;
  updatedAt?: Date;
  published: boolean;
  lastPublished?: Date;
};

export const Domain = {
  newDomain(hostName: string): Domain {
    return {
      hostNames: [hostName],
      createdAt: new Date(),
      published: false,
    };
  },
};
