import React, { FC } from 'react';
import { WhpptTab } from './WhpptTab';

type WhpptTabsProps = { tabs: Array<WhpptTab> } & {
  selectTab: (string) => void;
  selectedTab: string;
};

export const WhpptTabs: FC<WhpptTabsProps> = ({ tabs, selectTab, selectedTab }) => {
  return (
    <ul className="whppt-popup__tabs">
      {tabs.map((tab: WhpptTab, index: number) => (
        <li key={index}>
          <button
            disabled={tab.disabled}
            className={`whppt-popup__tab  ${selectedTab === tab.name ? 'whppt-popup__tab--active' : ''} ${
              tab.disabled ? 'whppt-popup__tab--disabled' : ''
            }`}
            onClick={() => selectTab(tab.name)}>
            <div className="whppt-popup__tab--inline">
              {tab.label}
              <div className="whppt-popup__tab--underline"></div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
