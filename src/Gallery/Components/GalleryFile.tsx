import React, { FC } from 'react';
import { GalleryComponent, GalleryItem } from '../Model';
import { WhpptIcon } from '../../ui/components';

export const getFileUrlFromGalleryItem = (file: GalleryItem) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  return `${baseUrl}/gallery/file/${file._id}/${file.fileInfo.originalname}`;
};

export const WhpptGalleryFile: FC<GalleryComponent> = ({ name, onClick, isSelected }) => {
  return (
    <div>
      <div className={`whppt-gallery__item ${isSelected ? 'whppt-gallery__item--selected' : ''}`} onClick={onClick}>
        <WhpptIcon is="file"></WhpptIcon>
      </div>
      {<p className="whppt-gallery-grid__svgs svg-title">{name}</p>}
    </div>
  );
};
