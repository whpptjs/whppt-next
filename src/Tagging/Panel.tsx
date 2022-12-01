import React, { FC } from 'react';
import { useWhppt } from '../Context';

export const TaggingPanel: FC<{ showFullNav: boolean }> = ({ showFullNav }) => {
  const { taggingPanel } = useWhppt();

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${taggingPanel.visible ? 'whppt-popup--active' : ''}`}>
      <div className="whppt-popup__contents">{taggingPanel.visible ? taggingPanel.component : <></>}</div>
    </div>
  );
};
