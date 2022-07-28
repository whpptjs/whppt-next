import React, { FC, useState } from 'react';

type WhpptGalleryImageProps = {
  url: string;
  remove: () => void;
  name: string;
  onClick: (e: any) => void;
  isSelected: boolean;
};

export const WhpptGalleryImage: FC<WhpptGalleryImageProps> = ({ url, remove, name, onClick, isSelected }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      {loaded ? null : (
        <div className="whppt-gallery__loader">
          <div className="whppt-gallery__loader__spinner"></div>
        </div>
      )}

      <div style={loaded ? {} : { display: 'none' }} onClick={onClick}>
        <img
          className={`whppt-gallery__image whppt-gallery__image${isSelected ? '--selected' : ''}`}
          onLoad={() => setLoaded(true)}
          src={url}
        />
        <p className="whppt-gallery__image-name">{name}</p>
      </div>
    </div>
  );
};
