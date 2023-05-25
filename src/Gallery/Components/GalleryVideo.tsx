import React, { FC } from 'react';
import { GalleryComponent } from '../Model';
import { getGalleryItemUrl } from '../../helpers';

type GalleryVideo = GalleryComponent & { autoplay: boolean };

export const WhpptGalleryVideo: FC<GalleryVideo> = ({ id, autoplay, onClick, isSelected }) => {
  return (
    <button className={'whppt-gallery__video'} onClick={onClick}>
      <video autoPlay={autoplay} controls className={`${isSelected ? 'whppt-gallery__image--selected' : ''}`}>
        <source src={getGalleryItemUrl('video', id)} type="video/mp4"></source>
      </video>
    </button>
  );
};
