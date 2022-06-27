import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import React, { FC } from 'react';
import { WhpptEditorArgs } from '../../..';
import { WhpptMenuBar } from './MenuBar';

export type WhpptRichTextArgs = WhpptEditorArgs & {
  id: string;
  label: string;
  info: string;
  error: string;
};

export const WhpptRichText: FC<WhpptRichTextArgs> = ({
  id,
  label,
  info,
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: `${value}`,

    onUpdate({ editor }) {
      const json2 = editor.getHTML();
      onChange(json2);

      // The content has changed.
    },
  });

  return (
    <div className="whppt-richtext">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <WhpptMenuBar editor={editor} />

      <EditorContent className="whppt-input" editor={editor} />
      <p className="whppt-input-info">{info}</p>
    </div>
  );
};
