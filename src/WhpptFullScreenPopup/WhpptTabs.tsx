import React, { FC } from 'react';
import { WhpptTab } from './index';

type WhpptTabsProps = { tabs: Array<WhpptTab>} & {
  selectTab: (string) => void;
  selectedTab: string;
};

export const WhpptTabs: FC<WhpptTabsProps> = ({ tabs, selectTab, selectedTab }) => {
  return (
    <ul className="whppt-pop__sidebar">
      {tabs.map((tab: WhpptTab, index: number) => (
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
