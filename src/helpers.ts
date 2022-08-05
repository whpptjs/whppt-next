import slugify from 'slugify';
import { ImageItemDataSize } from './Gallery/Model';

export const splitKeywords = (keyWordsString: string): string[] => {
  return keyWordsString
    .replace(/ +/g, '')
    .split(',')
    .filter(w => w);
};

export const formatSlug = slug => {
  if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

  slug = slug.replace(/\/{2,}/g, '/');

  slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
  slug = slug.replace(/[#?]/g, '');

  return slug;
};

export const buildCroppedImgUrl = (image: ImageItemDataSize, { height, width }: { height: string; width: string }) => {
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

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
