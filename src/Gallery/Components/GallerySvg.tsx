import React, { FC, useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useWhppt } from '../../Context';

type WhpptGallerySvgProps = {
  itemId: string;
  name: string;
  onClick: (e: any) => void;
  isSelected: boolean;
};

export const WhpptGallerySvg: FC<WhpptGallerySvgProps> = ({ itemId, name, isSelected, onClick }) => {
  const { api } = useWhppt();
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [svgString, setSvgString] = useState('');

  useEffect(() => {
    if (!created) return setCreated(true);
    api.gallery
      .loadSvg(itemId)
      .then(svgString => {
        setSvgString(svgString);
        setLoading(false);
      })
      .catch(error => setError(error.message || error));
  }, [api, created, itemId]);

  return error ? (
    <>
      <p>Svg could not be loaded</p> {error}
    </>
  ) : loading ? (
    <p>loading ...</p>
  ) : (
    <div className={`whppt-gallery__svg ${isSelected ? 'whppt-gallery__svg--selected' : ''}`} onClick={onClick}>
      {svgString && parse(svgString)}
      {<p className="whppt-gallery-grid__svgs svg-title">{name}</p>}
    </div>
  );
};
