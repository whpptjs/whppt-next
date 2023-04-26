import React, { FC, useState } from 'react';
import { appendApiKey } from '../../Api/Http';
import { GalleryComponent } from '../Model';

export const WhpptGalleryImage: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  const [loaded, setLoaded] = useState(false);

  const getImgUrl = imgId => {
    return appendApiKey(
      `${process.env.NEXT_PUBLIC_BASE_CDN_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL}/api/gallery-file/image/${imgId}?w=360`
    );
  };

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
          src={getImgUrl(id)}
        />
        <p className="whppt-gallery__image-name">{name}</p>
      </div>
    </div>
  );
};
