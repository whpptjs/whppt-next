import { WhpptTab } from '../ui/components';
import { GalleryFileType } from './Api';
import { FileDetails } from '../Api/Http';

export type GalleryTab = WhpptTab & {
  search: (type: GalleryFileType) => Promise<FileDetails[]>;
  save: (fileDetails: FileDetails) => void;
  upload: (newFile: FormData) => Promise<FileDetails>;
  remove: (id: string) => void;
  setSelected: (fileDetails) => void;
  selectedId: string | number;
  domainId: string;
};
