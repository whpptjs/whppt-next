import React, { FC, useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useWhppt } from '../../Context';
import { GalleryComponent } from '../Model';

export const WhpptGallerySvg: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  console.log('🚀 ~ file: GallerySvg.tsx ~ line 7 ~ id', id);
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
      .catch(error => {
        setError(error.message || error);
      });
  }, [created, id, api.gallery]);

  return (
    <div>
      {error ? (
        <div className="whppt-gallery__loader__error">
          <p>Svg could not be loaded.</p>
          <p className="whppt-gallery__image-name whppt-gallery__loader__error--wrap">{name}</p>
        </div>
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
      )}
    </div>
  );
};
