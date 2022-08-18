import React, { FC } from 'react';

type GalleryTabProps = {
  tag: string;
  disabled?: boolean;
};

export const WhpptGalleryTag: FC<GalleryTabProps> = ({ tag, disabled }) => {
  return (
    <div className={`whppt-gallery-settings__tag ${disabled ? 'whppt-gallery-settings__tag--disabled' : ''}`}>
      <span className="whppt-gallery-tag__text">{tag}</span>
    </div>
  );
};
