import React, { FC, useEffect, useState } from 'react';
import { useWhppt } from '../../Context';
import { ComponentArgs } from '../ComponentData';
import { SvgEditor } from '../../Editor/Svg/Editor';
import parse from 'html-react-parser';
import { WhpptSvgData } from '../../Editor/Svg/SvgData';

export type SvgComponentData = {
  svg: WhpptSvgData;
};

export const SvgComponent: FC<ComponentArgs<SvgComponentData>> = ({ data, onChange }) => {
  const { editing, api } = useWhppt();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [svgString, setSvgString] = useState('');

  useEffect(() => {
    if (data?.svg?.galleryItemId) {
      setLoading(true);
      api.gallery
        .loadSvg(data?.svg?.galleryItemId)
        .then(setSvgString)
        .catch(err => setError(err.message || err))
        .finally(() => setLoading(false));
    }
  }, [api.gallery, data]);

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <SvgEditor value={data?.svg} onChange={val => onChange({ ...data, svg: val })}>
        {error ? (
          <p>There was an error loading your SVG</p>
        ) : loading ? (
          <p>Loading your SVG...</p>
        ) : svgString ? (
          <div>{parse(svgString)}</div>
        ) : (
          <h1>Select your svg</h1>
        )}
      </SvgEditor>
    </div>
  );
};
