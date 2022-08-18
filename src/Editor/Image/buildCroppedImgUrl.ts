import { WhpptImageCrop } from './Model/ImageData';

export const buildCroppedImgUrl = (image: WhpptImageCrop, { height, width }: { height: string; width: string }) => {
  const params = [
    `w=${width}`,
    `h=${height}`,
    `cw=${image.coords.width}`,
    `ch=${image.coords.height}`,
    `cx=${image.coords.left}`,
    `cy=${image.coords.top}`,
  ].join('&');
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${image.galleryItemId}?${params}`;
};
