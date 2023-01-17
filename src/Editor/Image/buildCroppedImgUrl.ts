import { WhpptImageCrop } from './Model/ImageData';
import { appendApiKey } from '../../Api/Http';

export const buildCroppedImgUrl = (
  image: WhpptImageCrop,
  { height, width, scale }: { height?: number; width?: number; scale?: number }
) => {
  const _width = scale && width ? scale * width : width;
  const _height = scale && height ? scale * height : height;
  const baseParams = [];
  if (_width) baseParams.push(`w=${_width}`);
  if (_height) baseParams.push(`h=${_height}`);
  const coordParams = () => [`cw=${image.coords.width}`, `ch=${image.coords.height}`, `cx=${image.coords.left}`, `cy=${image.coords.top}`];
  const params = [...baseParams, ...(image.coords ? coordParams() : [])];
  const pathWithImageParams = `${process.env.NEXT_PUBLIC_BASE_CDN_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${
    image.galleryItemId
  }?${params.join('&')}`;
  return appendApiKey(pathWithImageParams);
};
