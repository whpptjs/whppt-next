export const splitKeywords = (keyWordsString) => {
  return keyWordsString.replace(/ +/g, '').split(',').filter(w => w);
};

export const formatSlug = (slug) => {
  if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

  slug = slug.replace(/\/{2,}/g, '/');
  slug = slug.replace(/[#?]/g, '');

  return slug;
}