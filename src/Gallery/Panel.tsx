import React, { FC } from 'react';
import { useWhppt } from '../Context';

export const GalleryPanel: FC<{ showFullNav: boolean }> = ({ showFullNav }) => {
  const { galleryPanel } = useWhppt();

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${galleryPanel.visible ? 'whppt-popup--active' : ''}`}>
      <div className="whppt-popup__contents">{galleryPanel.visible ? galleryPanel.component : <></>}</div>
    </div>
  );
};
