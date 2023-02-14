export type GalleryComponent = {
  id: string;
  name?: string;
  type?: string;
  onClick: (event: any) => void;
  isSelected: boolean;
};
