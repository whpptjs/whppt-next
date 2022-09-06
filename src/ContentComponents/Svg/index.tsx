import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { ComponentArgs } from '../ComponentData';
import { SvgEditor } from '../../Editor/Svg/Editor';
import { WhpptSvgData } from '../../Editor/Svg/SvgData';
import { WhpptSvg } from '../../ui/components/Svg';

export type SvgComponentData = {
  svg: WhpptSvgData;
};

export const SvgComponent: FC<ComponentArgs<SvgComponentData>> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <SvgEditor value={data?.svg} onChange={val => onChange({ ...data, svg: val })}>
        {data.svg && <WhpptSvg data={data.svg} />}
      </SvgEditor>
    </div>
  );
};
