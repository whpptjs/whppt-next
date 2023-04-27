import React, { FC, useState } from 'react';
import { GalleryComponent } from '../Model';
import { getGalleryItemUrl } from '../../helpers';

export const WhpptGalleryImage: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {loaded ? null : (
        <div className="whppt-gallery__loader">
          <div className="whppt-gallery__loader__spinner"></div>
        </div>
      )}

      <div style={loaded ? {} : { display: 'none' }} onClick={onClick}>
        <img
          className={`whppt-gallery__image ${isSelected ? 'whppt-gallery__image--selected' : ''}`}
          onLoad={() => setLoaded(true)}
          src={getGalleryItemUrl('image', id, 'w=360')}
        />
        <p className="whppt-gallery__image-name">{name}</p>
      </div>
    </div>
  );
};
