import React, { FC, useEffect, useState, useCallback } from 'react';
import { useWhppt } from '../../Context';
import parse from 'html-react-parser';
import { WhpptSvgData } from '../../Editor/Svg/SvgData';

export const WhpptSvg: FC<{ data: WhpptSvgData }> = ({ data }) => {
  const { api } = useWhppt();
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [svgString, setSvgString] = useState('');

  const loadSvgString = useCallback(() => {
    setLoading(true);
    api.gallery
      .loadSvg(data?.galleryItemId)
      .then(setSvgString)
      .catch(err => setError(err.message || err))
      .finally(() => setLoading(false));
  }, [api.gallery, data?.galleryItemId]);

  useEffect(() => {
    if (!created) return setCreated(true);

    setSvgString('');

    if (data?.galleryItemId) {
      loadSvgString();
    }
  }, [created, data?.galleryItemId, loadSvgString]);

  return error ? (
    <p>There was an error loading your SVG</p>
  ) : loading ? (
    <p>Loading your SVG...</p>
  ) : svgString ? (
    <div>{parse(svgString)}</div>
  ) : (
    <h1>Select your svg</h1>
  );
};
