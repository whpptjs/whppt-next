import React, { FC } from 'react';
import { useWhppt } from '../../Context';
import { WhpptTabs, WhpptTab } from '../../ui/components';

import { Seo } from '../../CommonSettings/Seo';
import { OpenGraph } from '../../CommonSettings/OpenGraph';
import { General } from './General';
import { Twitter } from '../../CommonSettings/Twitter';

export type WhpptSelectedType = string;

export const PageSettings: FC = () => {
  const { changeSettingsPanelActiveTab, settingsPanel } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: 'general', label: 'General' },
    { name: 's-e-o', label: 'Seo' },
    { name: 'open-graph', label: 'Open Graph' },
    { name: 'twitter', label: 'Twitter' },
  ];

  return (
    <div>
      <WhpptTabs tabs={tabs} selectTab={changeSettingsPanelActiveTab} selectedTab={settingsPanel.activeTab} />
      <WhpptTab selectedTab={settingsPanel.activeTab}>
        <General name="general" label="General" />
        <Seo name="s-e-o" label="Seo" />
        <OpenGraph name="open-graph" label="Open Graph" />
        <Twitter name="twitter" label="Twitter" />
      </WhpptTab>
    </div>
  );
};
