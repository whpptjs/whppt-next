import { WhpptTab } from '../ui/components';
import { FileDetails } from '../Api/Http';

export type GalleryTab = WhpptTab & {
  upload: (newFile: FormData) => Promise<void>;
  setSelected: (fileDetails) => void;
  selectedId: string | number;
  items: FileDetails[];
};
