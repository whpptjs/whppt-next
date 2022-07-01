import React, { FC } from 'react';
import { AppSettings } from '../App/Settings';
import { useWhppt } from '../Context';
import { PageSettings } from '../Page/Settings';

export const SettingsPanel: FC<{ showFullNav: boolean }> = ({
  showFullNav,
}) => {
  const { pageSettings, appSettings } = useWhppt();

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${
        pageSettings.visible || appSettings.visible ? 'whppt-popup--active' : ''
      }`}
    >
      <div className="whppt-popup__contents">
        {pageSettings.visible ? <PageSettings /> : <></>}
        {appSettings.visible ? <AppSettings /> : <></>}
      </div>
    </div>
  );
};
