import React, { FC } from 'react';
import { GalleryComponent } from '../Model';

export const getVideoUrlFromGalleryItemId = id => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  return `${baseUrl}/gallery/video/${id}`;
};

export const WhpptGalleryVideo: FC<GalleryComponent> = ({ id, name, onClick, isSelected }) => {
  return (
    <div>
      <div className={`whppt-gallery__item ${isSelected ? 'whppt-gallery__item--selected' : ''}`} onClick={onClick}>
        <video controls>
          <source src={getVideoUrlFromGalleryItemId(id)} />
        </video>
      </div>
      {<p className="whppt-gallery-grid__svgs svg-title">{name}</p>}
    </div>
  );
};
