import React, { FC, ReactElement } from 'react';
import { WhpptLink, WhpptLinkData } from '../../ui/components';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export const LinkEditor: FC<
  EditorArgs<WhpptLinkData> & {
    label?: string;
    children?: ReactElement | ReactElement[];
  }
> = ({ children, value, label, onChange, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  const opts = { label: label || 'Link Editor', ...options };
  return (
    <div
      className={['whppt-editor-selector', editing ? 'whppt-editor-selector--editing' : ''].join(' ')}
      onClick={e => {
        if (editing) {
          showEditor('link', value, onChange, opts);
          e.stopPropagation();
        }
      }}>
      {children ? children : <WhpptLink link={value} />}
    </div>
  );
};
