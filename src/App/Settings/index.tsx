import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { WhpptTabs, WhpptTab } from '../../ui/components';

import { Domain } from './Domain';

export type WhpptSelectedType = string;

export const AppSettings: FC = () => {
  const { appSettings, changeAppSettingsActiveTab } = useWhppt();

  const tabs: Array<WhpptTab> = [{ name: 'domain', label: 'Domain' }];

  return (
    <div>
      <WhpptTabs tabs={tabs} selectTab={changeAppSettingsActiveTab} selectedTab={appSettings.activeTab} />
      <WhpptTab selectedTab={appSettings.activeTab}>
        <Domain name="domain" label="Domains" />
        <></>
      </WhpptTab>
    </div>
  );
};
