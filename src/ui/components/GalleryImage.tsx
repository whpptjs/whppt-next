import React, { FC, useState } from 'react';

type WhpptGalleryImageProps = {
  url: string;
  remove: () => void;
  name: string;
  onClick: (e: any) => void;
  isSelected: boolean;
};

export const WhpptGalleryImage: FC<WhpptGalleryImageProps> = ({ url, remove, name, onClick, isSelected }) => {
  // const [showDelete, setShowDelete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {loaded ? null : (
        <div style={{ height: 200, width: 360 }}>
          <p>Loading ...</p>
        </div>
      )}

      <div style={loaded ? {} : { display: 'none' }} onClick={onClick}>
        <img
          className={`whppt-gallery__image ${isSelected ? 'whppt-gallery__image--selected' : ''}`}
          onLoad={() => setLoaded(true)}
          src={url}
        />
        <p>{name}</p>
      </div>
    </div>
  );
};
