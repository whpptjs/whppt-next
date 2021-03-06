import React, { FC } from 'react';
import { RichTextEditor } from '../../Editors';
import { ComponentData } from '../../../ui/Content';
import { useWhppt } from '../../../Context';

export type RichTextComponentData = ComponentData & {
  text: string;
};

export const RichTextComponent: FC<{ data: RichTextComponentData; onChange: (data: ComponentData) => void }> = ({ data, onChange }) => {
  const _data = data;
  const { editing } = useWhppt();

  // TODO: Check why editing is setting hovered?
  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <RichTextEditor value={_data.text} onChange={text => onChange({ ...data, text } as ComponentData)} />
    </div>
  );
};
