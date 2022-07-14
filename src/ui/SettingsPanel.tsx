import React, { FC } from 'react';
import { AppSettings } from '../App/Settings';
import { useWhppt } from '../Context';
import { PageSettings } from '../Page/Settings';
import { SiteSettings } from '../Site/Settings/index';

export const SettingsPanel: FC<{ showFullNav: boolean }> = ({ showFullNav }) => {
  const { pageSettings, siteSettings, appSettings } = useWhppt();
  const showPanel = [pageSettings, siteSettings, appSettings].some(setting => setting.visible);

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${showPanel ? 'whppt-popup--active' : ''}`}>
      <div className="whppt-popup__contents">
        {pageSettings.visible ? <PageSettings /> : <></>}
        {appSettings.visible ? <AppSettings /> : <></>}
        {siteSettings.visible ? <SiteSettings /> : <></>}
      </div>
    </div>
  );
};
