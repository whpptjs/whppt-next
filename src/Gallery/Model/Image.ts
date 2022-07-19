export type ImageData = {
  _id: string;
  fileId: string; // from FileDetails._id
  name: string;
  file: FormData; // TODO: might only be needed on the upload
  tags: string[];
  suggestedTags: string[];
  date: Date;
  defaultAlt: string;
  defaultCaption: string;
  aspect: '16x9' | '4x3' | 'square' | 'freeform';
  orientation: 'landscape' | 'portrait';
  alt: string;
  caption: string;
};
