import React, { FC } from 'react';
import { WhpptIcon } from '../Icon';

// export const WhpptMenuBar: FC = () => {
export const WhpptMenuBar: FC<{ editor: any; formatOptionsOnly: boolean }> = ({ editor, formatOptionsOnly }) => {
  if (!editor) {
    return null;
  }

  if (formatOptionsOnly)
    return (
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
          <div>
            <div className="hidden">bold</div>
            <WhpptIcon is="bold"></WhpptIcon>
          </div>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
          <div className="hidden">italic</div>
          <WhpptIcon is="italic"></WhpptIcon>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
          <div className="hidden">underline</div>
          <WhpptIcon is="underline"></WhpptIcon>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
          <div className="hidden">left-align</div>
          <WhpptIcon is="left-align"></WhpptIcon>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
          <div className="hidden">center-align</div>
          <WhpptIcon is="center-align"></WhpptIcon>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
          <div className="hidden">right-align</div>
          <WhpptIcon is="right-align"></WhpptIcon>
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <div className="hidden">undo</div>
          <WhpptIcon is="undo"></WhpptIcon>
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <div className="hidden">redo</div>
          <WhpptIcon is="redo"></WhpptIcon>
        </button>
      </div>
    );
  return (
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div>
          <div className="hidden">bold</div>
          <WhpptIcon is="bold"></WhpptIcon>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">italic</div>
        <WhpptIcon is="italic"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">underline</div>
        <WhpptIcon is="underline"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">paragraph</div>
        <WhpptIcon is="paragraph"></WhpptIcon>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">h2</div>
        <WhpptIcon is="header-2"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">h3</div>
        <WhpptIcon is="header-3"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">h4</div>
        <WhpptIcon is="header-4"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">bullet-list</div>
        <WhpptIcon is="bullet-list"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">ordered-list</div>
        <WhpptIcon is="ordered-list"></WhpptIcon>
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">left-align</div>
        <WhpptIcon is="left-align"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">center-align</div>
        <WhpptIcon is="center-align"></WhpptIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'whppt-richtext-menu-button is-active' : 'whppt-richtext-menu-button'}>
        <div className="hidden">right-align</div>
        <WhpptIcon is="right-align"></WhpptIcon>
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <div className="hidden">undo</div>
        <WhpptIcon is="undo"></WhpptIcon>
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <div className="hidden">redo</div>
        <WhpptIcon is="redo"></WhpptIcon>
      </button>
    </div>
  );
};
