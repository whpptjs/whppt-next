import React, { FC, ReactElement } from 'react';
import { WhpptLinkData } from '../../ui/components';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export const LinkEditor: FC<
  EditorArgs<WhpptLinkData> & {
    label?: string;
    children: ({ isEditing }: { isEditing: boolean }) => ReactElement;
  }
> = ({ children, value, label, onChange, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts = { label: label || 'Link Editor', ...options };
  return (
    <div
      className="whppt-editor-selector"
      onClick={e => {
        console.log('🚀 ~ file: LinkEditor.tsx ~ line 20 ~ editing', editing);
        if (editing) {
          showEditor('link', value, onChange, opts);
          e.stopPropagation();
        }
      }}>
      {children({ isEditing: editing })}
    </div>
  );
};
