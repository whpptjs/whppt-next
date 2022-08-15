import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { ComponentArgs } from '../ComponentData';
import { SvgEditor } from '../../Editor/Svg/Editor';
import parse from 'html-react-parser';
import { WhpptSvgData } from '../../Editor/Svg/SvgData';

export type SvgComponentData = {
  svg: WhpptSvgData;
};

export const SvgComponent: FC<ComponentArgs<SvgComponentData>> = ({ data, onChange }) => {
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <SvgEditor value={data?.svg} onChange={val => onChange({ ...data, svg: val })}>
        {data?.svg?.svgString ? <div>{parse(data.svg.svgString)}</div> : <h1>Select your svg</h1>}
      </SvgEditor>
    </div>
  );
};
