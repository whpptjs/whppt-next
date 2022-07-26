import React from 'react';
import { FC } from 'react';
import { PlainTextEditor } from '../../Components';
import { ComponentData } from '../../../ui/Content';
import { useWhppt } from '../../../Context';

export type PlainTextPageComponentData = ComponentData & {
  text: string;
};

export const PlainTextComponent: FC<{ data: PlainTextPageComponentData; onChange: (data: ComponentData) => void }> = ({
  data,
  onChange,
}) => {
  const _data = data;
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <PlainTextEditor value={_data.text} onChange={text => onChange({ ...data, text } as ComponentData)}>
        <div>{_data.text || 'Plain Text change'}</div>
      </PlainTextEditor>
    </div>
  );
};
