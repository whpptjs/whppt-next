import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { ComponentArgs } from '../ComponentData';
import { SvgEditor } from '../../Editor/Svg/Editor';

export type SvgComponentData = {
  svg: any;
};

export const SvgComponent: FC<ComponentArgs<SvgComponentData>> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <SvgEditor value={data?.svg} onChange={val => onChange({ ...data, svg: val })}>
        {data?.svg?.desktop ? <img src={data.svg} /> : <h1>Select your svg</h1>}
      </SvgEditor>
    </div>
  );
};
