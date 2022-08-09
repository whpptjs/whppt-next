export const PlainTextDefinition = {
  key: 'PlainText',
  name: 'Plain Text',
  init: content => {
    return { text: '', ...content };
  },
};
