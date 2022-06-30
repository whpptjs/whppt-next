import React, { FC } from 'react';
import { Tab, Tabs } from './index';

type TabsProps = { tabs: Tabs } & {
  selectTab: (string) => void;
  selectedTab: string;
};

export const WhpptTabs: FC<TabsProps> = ({ tabs, selectTab, selectedTab }) => {
  return (
    <ul className="whppt-pop__sidebar">
      {tabs.map((tab: Tab, index: number) => (
        <li key={index}>
          <button
            className={`whppt-popup__tab  ${
              selectedTab === tab.name ? 'whppt-popup__tab--active' : ''
            }`}
            onClick={() => selectTab(tab.name)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
