import { GalleryComponent } from './GalleryComponent';
import { GalleryFileType, GalleryItem } from '.';

export type GalleryTab = {
  upload: (newFile: FormData) => Promise<void>;
  setSelected: (fileDetails) => void;
  selectedId: string | number;
  items: GalleryItem[];
  type: GalleryFileType;
  Component: React.FC<GalleryComponent>;
  disabled?: boolean;
};
