export const splitKeywords = (keyWordsString) => {
  return keyWordsString.replace(/ +/g, '').split(',').filter(w => w);
};