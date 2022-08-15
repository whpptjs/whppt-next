import React, { FC, useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useWhppt } from '../../Context';

type WhpptGallerySvgProps = {
  itemId: string | number;
  name: string;
  onClick: (e: any) => void;
  isSelected: boolean;
};

export const WhpptGallerySvg: FC<WhpptGallerySvgProps> = ({ itemId, name, isSelected }) => {
  const { api } = useWhppt();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [svgString, setSvgString] = useState('');

  useEffect(() => {
    //TODO: Check if we will return Svg or gallery Item
    api.gallery.loadSvg
      .load('_id')
      .then(res => res.text())
      .then(svgString => {
        setSvgString(svgString);
        setLoading(true);
      })
      .catch(error => setError(error.message || error));
  }, [itemId]);

  return error ? (
    <p>Svg could not be loaded</p>
  ) : loading ? (
    <p>loading ...</p>
  ) : (
    <div className={`whppt-gallery__svg ${isSelected ? 'whppt-gallery__svg--selected' : ''}`}>
      {parse(svgString)}
      {<p className="whppt-gallery-grid--svgs svg-title">{name}</p>}
    </div>
  );
};
