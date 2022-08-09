export const RichTextDefinition = {
  key: 'RichText',
  name: 'Rich Text',
  init: content => {
    return { text: '', ...content };
  },
};
