import React, { FC } from 'react';
import { GalleryComponent } from '../Model';
import { WhpptIconFile } from '../../icons/File';

export const WhpptGalleryDoc: FC<GalleryComponent> = ({ name, type, onClick, isSelected }) => {
  return (
    <div>
      <div className={`whppt-gallery__doc ${isSelected ? 'whppt-gallery__doc--selected' : ''}`} onClick={onClick}>
        <WhpptIconFile />
        {type ? <div className={`whppt-gallery__doc-type`}>{type}</div> : <></>}
      </div>
      {<p className="whppt-gallery-grid__svgs svg-title">{name}</p>}
    </div>
  );
};
