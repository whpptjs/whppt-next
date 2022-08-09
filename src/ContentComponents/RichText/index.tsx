import React, { FC } from 'react';
import { RichTextEditor } from '../../Editor/Editors';
import { ComponentArgs } from '../ComponentData';
import { useWhppt } from '../../Context';

export type RichTextComponentData = {
  text: string;
};

export const RichTextComponent: FC<ComponentArgs<RichTextComponentData>> = ({ data, onChange }) => {
  const _data = data;
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <RichTextEditor value={_data.text} onChange={text => onChange({ ...data, text })} />
    </div>
  );
};
