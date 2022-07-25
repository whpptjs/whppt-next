import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { WhpptTabs, WhpptTab } from '../../ui/components';

import { Domain } from './Domain';
import { WhpptUsers } from './Users';

export type WhpptSelectedType = string;

export const AppSettings: FC = () => {
  const { settingsPanel, changeSettingsPanelActiveTab } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: 'domain', label: 'Domain' },
    { name: 'users', label: 'Users' },
  ];

  return (
    <div>
      <WhpptTabs tabs={tabs} selectTab={changeSettingsPanelActiveTab} selectedTab={settingsPanel.activeTab} />
      <WhpptTab selectedTab={settingsPanel.activeTab}>
        <Domain name="domain" label="Domains" />
        <WhpptUsers name="users" label="Users" />
      </WhpptTab>
    </div>
  );
};
