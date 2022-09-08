import React, { FC, useState, useEffect } from 'react';
import { useWhppt } from '../../Context';
import { GalleryComponent } from '../Model';
import { WhpptIcon } from '../../ui/components';

export const WhpptGalleryFile: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  const { api } = useWhppt();
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [file, setFile] = useState('');
  console.log('🚀 ~ file: GalleryFile.tsx ~ line 12 ~ file', file);

  useEffect(() => {
    if (!created) return setCreated(true);
    api.gallery
      .loadFile(id, name)
      .then(item => {
        setFile(item);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || error);
      });
  }, [created, id, api.gallery, name]);

  return (
    <div>
      {error ? (
        <div className="whppt-gallery__loader__error">
          <p>File could not be loaded.</p>
          <p className="whppt-gallery__image-name whppt-gallery__loader__error--wrap">{name}</p>
        </div>
      ) : loading ? (
        <div className="whppt-gallery__loader">
          <div className="whppt-gallery__loader__spinner"></div>
        </div>
      ) : (
        <div>
          <div className={`whppt-gallery__item ${isSelected ? 'whppt-gallery__item--selected' : ''}`} onClick={onClick}>
            <WhpptIcon is="file"></WhpptIcon>
          </div>
          {<p className="whppt-gallery-grid__svgs svg-title">{name}</p>}
        </div>
      )}
    </div>
  );
};
