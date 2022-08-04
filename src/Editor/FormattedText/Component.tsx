import React, { FC } from 'react';
import { FormattedTextEditor } from './Editor';
import { ComponentData } from '../../ui/Content';
import { useWhppt } from '../../Context';

export type FormattedTextComponentData = ComponentData & {
  text: string;
};

export const FormattedTextComponent: FC<{ data: FormattedTextComponentData; onChange: (data: ComponentData) => void }> = ({
  data,
  onChange,
}) => {
  const _data = data;
  const { editing } = useWhppt();

  // TODO: Check why editing is setting hovered?
  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <FormattedTextEditor value={_data.text} onChange={text => onChange({ ...data, text } as ComponentData)} />
    </div>
  );
};
