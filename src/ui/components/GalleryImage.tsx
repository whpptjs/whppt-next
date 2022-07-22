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
          style={{ height: 200, width: 360, objectFit: 'cover', cursor: 'pointer', outline: isSelected ? '2px solid blue' : '' }}
          onLoad={() => setLoaded(true)}
          src={url}
          // onMouseEnter={() => setShowDelete(true)}
          // onMouseLeave={() => setShowDelete(false)}
        />
        <p className="whppt-gallery__image-name">{name}</p>
      </div>
    </div>
  );
};
