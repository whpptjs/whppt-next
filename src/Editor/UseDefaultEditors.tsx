import React from 'react';
import { ContentEditorOptions } from './Components';
import { EditorArgs } from './EditorArgs';
import {
  WhpptPlaintextEditor,
  WhpptRichtextEditor,
  WhpptFormattedTextEditor,
  WhpptListEditor,
  ListEditorOptions,
  WhpptLinkEditor,
  WhpptContentEditor,
} from './Panels';

export type UseDefaultEditorsArgs = EditorArgs<any> & { editor: string };

export const UseDefaultEditors = ({ editor, value, onChange, options }: UseDefaultEditorsArgs) => {
  if (editor === 'plainText') return <WhpptPlaintextEditor value={value} onChange={onChange} options={options} />;
  if (editor === 'richText') return <WhpptRichtextEditor value={value} onChange={onChange} options={options} />;
  if (editor === 'formattedText') return <WhpptFormattedTextEditor value={value} onChange={onChange} options={options} />;
  if (editor === 'list') return <WhpptListEditor value={value} onChange={onChange} options={options as ListEditorOptions} />;
  if (editor === 'link') return <WhpptLinkEditor value={value} onChange={onChange} options={options} />;
  if (editor === 'content') return <WhpptContentEditor value={value} onChange={onChange} options={options as ContentEditorOptions} />;
};
