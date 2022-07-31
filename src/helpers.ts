import slugify from 'slugify';

export const splitKeywords = keyWordsString => {
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

export const joinQueryTags = tags => {
  if (!tags) return '';

  let tagsQuery = '';

  tags.forEach(tag => {
    tagsQuery += `&queryTags[]=${tag}`;
  });

  return tagsQuery;
};
