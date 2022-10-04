import { WhpptImageCrop } from './Model/ImageData';
import { appendApiKey } from '../../Api/Http';

export const buildCroppedImgUrl = (image: WhpptImageCrop, { height, width }: { height: string; width: string }) => {
  const baseParams = [`w=${width}`, `h=${height}`];
  const coordParams = () => [`cw=${image.coords.width}`, `ch=${image.coords.height}`, `cx=${image.coords.left}`, `cy=${image.coords.top}`];
  const params = [...baseParams, ...(image.coords ? coordParams() : [])];
  const pathWithImageParams = `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${image.galleryItemId}?${params.join('&')}`;
  return appendApiKey(pathWithImageParams);
};
