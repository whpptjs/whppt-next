import React from 'react';
import { FC } from 'react';
import { PlainTextEditor } from '../../Editor/PlainText/Editor';
import { ComponentArgs } from '../ComponentData';
import { useWhppt } from '../../Context';

export type PlainTextPageComponentData = {
  text: string;
};

export const PlainTextComponent: FC<ComponentArgs<PlainTextPageComponentData>> = ({ data, container, onChange }) => {
  const _data = data;
  const { editing } = useWhppt();

  return (
    <div className={`${container ? 'container' : ''} ${editing ? 'whppt-content--hovered' : ''}`} onClick={e => e.stopPropagation()}>
      <PlainTextEditor value={_data.text} onChange={text => onChange({ ...data, text })}>
        <div>{_data.text || 'Plain Text change'}</div>
      </PlainTextEditor>
    </div>
  );
};
