import React, { FC, useState } from 'react';
import { GalleryComponent } from '../Model';

export const WhpptGalleryImage: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  const [loaded, setLoaded] = useState(false);

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${imgId}?w=360`;
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
