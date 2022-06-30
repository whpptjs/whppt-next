import React, { FC } from 'react';
import { WhpptTab } from './index';

type WhpptTabsProps = { tabs: Array<WhpptTab>} & { selectTab: (string) => void }

export const WhpptTabs: FC<WhpptTabsProps> = ({tabs, selectTab}) => {
  return (
    <ul className="whppt-pop__sidebar">
      {tabs.map((tab: WhpptTab, index: number) => (
        <li className="whppt-popup__tab" key={index}>
          <button className="whppt-richtext-menu-button" onClick={() => selectTab(tab.name)}>
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
