import React, { FC } from 'react';
import { WhpptTagFilters } from '..';
import { useWhppt } from '../../Context';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';

export const TagFilterEditor: FC<
  EditorArgs<WhpptTagFilters> & {
    label?: string;
    // children?: ReactElement | ReactElement[];
  }
> = ({ value, onChange, label, options = {} as EditorOptions }) => {
  const { editing, showEditor } = useWhppt();
  return (
    <div
      className={['whppt-editor-selector whppt-tag-filter', editing ? 'whppt-editor-selector--editing' : ''].join(' ')}
      onClick={e => {
        if (editing) {
          showEditor('tagFilter', value, onChange, {
            label: label || 'Tag Filter',
            options,
          });
          e.stopPropagation();
        }
      }}>
      Tag Filter component
    </div>
  );
};
