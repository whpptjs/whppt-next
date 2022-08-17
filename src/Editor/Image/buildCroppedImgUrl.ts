import { WhpptImageCrop } from './Model/ImageData';

export const buildCroppedImgUrl = (image: WhpptImageCrop, { height, width }: { height: string; width: string }) => {
  const baseParams = [`w=${width}`, `h=${height}`];
  const coordParams = () => [`cw=${image.coords.width}`, `ch=${image.coords.height}`, `cx=${image.coords.left}`, `cy=${image.coords.top}`];
  const params = [...baseParams, ...(image.coords ? coordParams() : [])];
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${image.galleryItemId}?${params.join('&')}`;
};
