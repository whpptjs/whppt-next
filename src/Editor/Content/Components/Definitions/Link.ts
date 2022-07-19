export const LinkDefinition = {
  key: 'Link',
  name: 'Link',
  init: content => {
    return { link: { type: 'page', href: '', text: '' }, ...content };
  },
};
