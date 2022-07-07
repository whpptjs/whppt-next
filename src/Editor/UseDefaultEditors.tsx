import React from 'react';
import {
  WhpptPlaintextEditor,
  WhpptRichtextEditor,
  WhpptFormattedTextEditor,
  WhpptListEditor,
} from './Panels';

export const UseDefaultEditors = ({ editor, value, onChange, options }) => {
  if (editor === 'plainText')
    return (
      <WhpptPlaintextEditor
        value={value}
        onChange={onChange}
        options={options}
      />
    );
  if (editor === 'richText')
    return (
      <WhpptRichtextEditor
        value={value}
        onChange={onChange}
        options={options}
      />
    );
  if (editor === 'formattedText')
    return (
      <WhpptFormattedTextEditor
        value={value}
        onChange={onChange}
        options={options}
      />
    );
  if (editor === 'list')
    return (
      <WhpptListEditor value={value} onChange={onChange} options={options} />
    );
};
