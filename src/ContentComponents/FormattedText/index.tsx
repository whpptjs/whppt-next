import React, { FC } from 'react';
import { FormattedTextEditor } from '../../Editor/FormattedText/Editor';
import { ComponentArgs } from '../ComponentData';
import { useWhppt } from '../../Context';

export type FormattedTextComponentData = {
  text: string;
};

export const FormattedTextComponent: FC<ComponentArgs<FormattedTextComponentData>> = ({ data, container, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={`${container ? 'container' : ''} ${editing ? 'whppt-content--hovered' : ''}`} onClick={e => e.stopPropagation()}>
      <FormattedTextEditor value={data.text} onChange={text => onChange({ ...data, text })} />
    </div>
  );
};
