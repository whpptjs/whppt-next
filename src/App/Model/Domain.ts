export type Domain = {
  _id?: string;
  name: string;
  hostnames: string[];
  createdAt: Date;
  updatedAt?: Date;
  published: boolean;
  lastPublished?: Date;
};
