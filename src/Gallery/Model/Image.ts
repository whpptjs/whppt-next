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
};

export type PageImageData = {
  crops: { [key: string]: ImageData };
};

export type ImageDataSize = {
  //this is to be used by editor
  altText: string;
  galleryItemId: string;
  crop: {
    aspectRatio: {
      label: string;
      ratio: {
        w: Number;
        h: number;
      };
    };
    orientation: 'landscape' | 'portrait' | undefined;
    coords: {
      width: number;
      height: number;
      left: number;
      top: number;
    };
  };
};
