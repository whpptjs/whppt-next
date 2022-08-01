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

export const buildCroppedImgUrl = (imgId, { height, left, top, width }) => {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${imgId}?cw=${width}&ch=${height}&cx=${left}&cy=${top}`;
};
