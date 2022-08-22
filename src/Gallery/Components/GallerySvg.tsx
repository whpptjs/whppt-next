import React, { FC, useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useWhppt } from '../../Context';
import { GalleryComponent } from '../Model';

export const WhpptGallerySvg: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  const { api } = useWhppt();
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [svgString, setSvgString] = useState('');

  useEffect(() => {
    if (!created) return setCreated(true);
    api.gallery
      .loadSvg(id)
      .then(svgString => {
        setSvgString(svgString);
        setLoading(false);
      })
      .catch(error => setError(error.message || error));
  }, [created, id, api.gallery]);

  return error ? (
    <>
      <p>Svg could not be loaded</p> {error}
    </>
  ) : loading ? (
    <div className="whppt-gallery__loader">
      <div className="whppt-gallery__loader__spinner"></div>
    </div>
  ) : (
    <div>
      <div className={`whppt-gallery__svg ${isSelected ? 'whppt-gallery__svg--selected' : ''}`} onClick={onClick}>
        {svgString && parse(svgString)}
      </div>
      {<p className="whppt-gallery-grid__svgs svg-title">{name}</p>}
    </div>
  );
};
