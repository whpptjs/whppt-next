export type Domain = {
  _id?: string;
  name: string;
  hostNames: string[];
  createdAt: Date;
  updatedAt?: Date;
  published: boolean;
  lastPublished?: Date;
};
