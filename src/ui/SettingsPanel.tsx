import React, { FC, ReactElement } from 'react';
import { AppSettings } from '../App/Settings';
import { useWhppt } from '../Context';
import { PageSettings } from '../Page/Settings';
import { SiteSettings } from '../Site/Settings/index';

export const defaultSettingsPanelState = {
  visible: false,
  component: <></>,
};
export type settingsPanel = {
  visible: boolean;
  component: ReactElement;
};

export const SettingsPanel: FC<{ showFullNav: boolean }> = ({ showFullNav }) => {
  const { pageSettings, siteSettings, appSettings, settingsPanel } = useWhppt();
  const showPanel = [pageSettings, siteSettings, appSettings, settingsPanel].some(setting => setting.visible);

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${showPanel ? 'whppt-popup--active' : ''}`}>
      <div className="whppt-popup__contents">
        {pageSettings.visible ? <PageSettings /> : <></>}
        {appSettings.visible ? <AppSettings /> : <></>}
        {siteSettings.visible ? <SiteSettings /> : <></>}
        {settingsPanel.visible ? settingsPanel.component : <></>}
      </div>
    </div>
  );
};
