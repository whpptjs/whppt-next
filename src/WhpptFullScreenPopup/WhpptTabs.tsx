import React, { FC } from 'react';
import { Tab, Tabs } from './index';

type TabsProps = { tabs: Tabs} & { selectTab: (string) => void }

export const WhpptTabs: FC<TabsProps> = ({tabs, selectTab}) => {
  return (
    <ul className="whppt-pop__sidebar">
      {tabs.map((tab: Tab, index: number) => (
        <li className="whppt-popup__tab" key={index}>
          <button className="whppt-richtext-menu-button" onClick={() => selectTab(tab.name)}>
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
