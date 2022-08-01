import React from 'react';
import { ContentEditorOptions } from './Editors';
import { EditorArgs } from './EditorArgs';
import {
  WhpptPlaintextEditorPanel,
  WhpptRichtextEditorPanel,
  WhpptFormattedTextEditorPanel,
  WhpptListEditorPanel,
  ListEditorOptions,
  WhpptLinkEditorPanel,
  WhpptContentEditorPanel,
  WhpptNewPageEditorPanel,
  WhpptContentsTreeEditorPanel,
  WhpptImageEditor,
  ImageEditorOptions,
} from './Panels';

export type UseDefaultEditorsArgs = EditorArgs<any> & { editor: string };

export const UseDefaultEditors = ({ editor, value, onChange, options }: UseDefaultEditorsArgs) => {
  if (editor === 'newPage') return <WhpptNewPageEditorPanel />;
  if (editor === 'contentsTree') return <WhpptContentsTreeEditorPanel />;
  if (editor === 'plainText') return <WhpptPlaintextEditorPanel value={value} onChange={onChange} options={options} />;
  if (editor === 'richText') return <WhpptRichtextEditorPanel value={value} onChange={onChange} options={options} />;
  if (editor === 'formattedText') return <WhpptFormattedTextEditorPanel value={value} onChange={onChange} options={options} />;
  if (editor === 'list') return <WhpptListEditorPanel value={value} onChange={onChange} options={options as ListEditorOptions} />;
  if (editor === 'link') return <WhpptLinkEditorPanel value={value} onChange={onChange} options={options} />;
  if (editor === 'content') return <WhpptContentEditorPanel value={value} onChange={onChange} options={options as ContentEditorOptions} />;
  if (editor === 'image') return <WhpptImageEditor value={value} onChange={onChange} options={options as ImageEditorOptions} />;
};
