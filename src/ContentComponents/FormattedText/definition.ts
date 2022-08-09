import { ComponentData } from '../ComponentData';

export type FormattedTextData = ComponentData & {
  text: string;
};

export const FormattedTextDefinition = {
  key: 'FormattedText',
  name: 'Formatted Text',
  init: (content: FormattedTextData) => {
    return { ...content, text: content.text || 'Add your text here' } as FormattedTextData;
  },
};
