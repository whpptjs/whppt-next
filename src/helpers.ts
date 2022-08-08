import slugify from 'slugify';

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
