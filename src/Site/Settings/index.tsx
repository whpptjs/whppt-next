import React, { FC, useEffect } from 'react';
import { useWhppt } from '../../Context';
import { WhpptTabs, WhpptTab } from '../../ui/components';

import { SiteSeo } from './SiteSeo';
import { SiteOpenGraph } from './SiteOpenGraph';
import { General } from './General';
import { SiteTwitter } from './SiteTwitter';
import { Redirects } from './Redirects';
import { SiteTagging } from './SiteTagging';

export type WhpptSelectedType = string;

export const SiteSettings: FC = () => {
  const { api, domain, settingsPanel, changeSettingsPanelActiveTab, setSettingsData } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: 'general', label: 'General' },
    { name: 's-e-o', label: 'Seo' },
    { name: 'open-graph', label: 'Open Graph' },
    { name: 'twitter', label: 'Twitter' },
    { name: 'redirects', label: 'Redirects' },
    { name: 'banner', label: 'Banner' },
    { name: 'tagging', label: 'Tagging' },
  ];

  useEffect(() => {
    api.site.settings.load({ domain }).then(settings => {
      setSettingsData(settings);
    });
  }, [api.site.settings, domain, setSettingsData]);

  return (
    <div>
      <WhpptTabs tabs={tabs} selectTab={changeSettingsPanelActiveTab} selectedTab={settingsPanel.activeTab} />
      <WhpptTab selectedTab={settingsPanel.activeTab}>
        <General name="general" label="General" />
        <SiteSeo name="s-e-o" label="Seo" />
        <SiteOpenGraph name="open-graph" label="Open Graph" />
        <SiteTwitter name="twitter" label="Twitter" />
        <Redirects name="redirects" label="Redirects" />
        <SiteTagging name="tagging" label="Tagging" />
      </WhpptTab>
    </div>
  );
};
