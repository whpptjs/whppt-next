import { WhpptTab } from '../../ui/components';
import { GalleryItem } from '../Model';

export type GalleryTab = WhpptTab & {
  upload: (newFile: FormData) => Promise<void>;
  setSelected: (fileDetails) => void;
  selectedId: string | number;
  items: GalleryItem[];
};
