import React, { FC } from 'react';
import { useWhppt } from '../Context';

export const SettingsPanel: FC<{ showFullNav: boolean }> = ({ showFullNav }) => {
  const { settingsPanel } = useWhppt();

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${settingsPanel.visible ? 'whppt-popup--active' : ''}`}>
      <div className="whppt-popup__contents">{settingsPanel.visible ? settingsPanel.component : <></>}</div>
    </div>
  );
};
