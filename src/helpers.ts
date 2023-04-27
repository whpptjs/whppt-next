import slugify from 'slugify';
import { appendApiKey } from './Api/Http';

export const formatSlug = slug => {
  if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

  slug = slug.replace(/\/{2,}/g, '/');

  slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
  slug = slug.replace(/[#?]/g, '');

  return slug;
};

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getGalleryItemUrl = (type: string, id: string, params?: string) => {
  return appendApiKey(
    `${process.env.NEXT_PUBLIC_BASE_CDN_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL}/api/gallery-file/${type}/${id}?${params || ''}`
  );
};
