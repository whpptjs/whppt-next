import React, { FC } from 'react';

type GalleryTabProps = {
  tag: string;
  disabled?: boolean;
  active?: boolean;
};

export const WhpptGalleryTag: FC<GalleryTabProps> = ({ tag, disabled, active }) => {
  return (
    <div
      className={[
        'whppt-gallery-settings__tag',
        disabled ? 'whppt-gallery-settings__tag--disabled' : '',
        active ? 'whppt-gallery-settings__tag--active' : '',
      ].join(' ')}>
      <span className="whppt-gallery-tag__text">{tag}</span>
    </div>
  );
};
