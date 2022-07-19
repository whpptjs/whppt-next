import React, { FC, useState } from 'react';

type WhpptGalleryImageProps = {
  url: string;
  remove: () => void;
  name: string;
  onClick: (e: any) => void;
};

export const WhpptGalleryImage: FC<WhpptGalleryImageProps> = ({ url, remove, name, onClick }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {loaded ? null : (
        <div style={{ height: 200, width: 360 }}>
          <p>Loading ...</p>
        </div>
      )}

      <div style={loaded ? {} : { display: 'none' }} onClick={onClick}>
        <img
          style={{ height: 200, width: 360, objectFit: 'cover', cursor: 'pointer' }}
          onLoad={() => setLoaded(true)}
          src={url}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        />
        {showDelete && (
          <div
            className="whppt-gallery-delete"
            onMouseEnter={() => setShowDelete(true)}
            onClick={e => {
              e.stopPropagation();
              remove();
            }}>
            Delete
          </div>
        )}
        <p>{name}</p>
      </div>
    </div>
  );
};
