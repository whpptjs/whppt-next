export type GalleryItem = {
  _id: string;
  name: string;
  file: FormData;
  date: Date;
  tags: string[];
  suggestedTags: string[];
  defaultAlt: string;
  defaultCaption: string;
};
