export const splitKeywords = (keyWordsString: string): string[] => {
  return keyWordsString
    .replace(/ +/g, '')
    .split(',')
    .filter(w => w);
};
