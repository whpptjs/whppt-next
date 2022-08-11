import React, { FC } from 'react';

type GalleryTabProps = {
  tag: string;
};

export const WhpptGalleryTag: FC<GalleryTabProps> = ({ tag }) => {
  return (
    <div className="whppt-gallery__tag">
      <span className="whppt-gallery-tag__text">{tag}</span>
    </div>
  );
};
