export type GalleryItemType = 'image' | 'video' | 'file' | 'lotty' | 'svg';
export type GalleryFileInfo = {
  originalname: string;
  ext?: string;
  mime?: string;
  type: string;
};

export type GalleryItem = {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  domainId?: string;
  type: GalleryItemType;
  defaultAltText?: string;
  defaultCaption?: string;
  tags: string[];
  suggestedTags?: string[];
  fileInfo?: GalleryFileInfo;
  date: Date;
  uploadeOn: Date;
};
