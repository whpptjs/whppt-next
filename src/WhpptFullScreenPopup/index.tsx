import React, { FC, useContext, useState, useCallback } from 'react';
import { Whppt } from '../Context';
import { WhpptTabs } from './WhpptTabs';
import { WhpptTab } from './WhpptTab';

import { Seo } from './forms/pageSettings/Seo';
import { OpenGraph } from './forms/pageSettings/OpenGraph';
import { General } from './forms/pageSettings/General';
import { Twitter } from './forms/pageSettings/Twitter';

export type WhpptTab = {
  name: string;
  label: string;
};

export type WhpptSelectedType = string;

export const WhpptFullScreenPopup: FC<{ showFullNav: boolean }> = ({
  showFullNav,
}) => {
  const { editing, toggleEditing } = useContext(Whppt);
  const [selectedTab, setSelectedTab] = useState('general');

  const selectTab = useCallback((pageName) => {
    setSelectedTab(pageName);
  }, []);

  const tabs: Array<WhpptTab> = [
    { name: 'general', label: 'General' },
    { name: 's-e-o', label: 'Seo' },
    { name: 'open-graph', label: 'Open Graph' },
    { name: 'twitter', label: 'Twitter' },
  ];

  return (
    <div
      className={`whppt-popup whppt-popup 
      ${showFullNav ? 'whppt-popup--fullNav' : ''}
      ${editing ? 'whppt-popup whppt-popup--active' : ''}`}
    >
      {/* <div
      className={`whppt-editor ${
        editorState.editor && editing ? 'whppt-editor--active' : ''
      }`}
    > */}
      <div className="whppt-popup__contents">
        <WhpptTabs
          tabs={tabs}
          selectTab={selectTab}
          selectedTab={selectedTab}
        />
        {/* <div className="whppt-popup__contents--left">
          <WhpptTabs
            tabs={tabs}
            selectTab={selectTab}
            selectedTab={selectedTab}
          />
        </div> */}
        <WhpptTab selectedTab={selectedTab}>
          <General name="general" label="General" />
          <Seo name="s-e-o" label="Seo" />
          <OpenGraph name="open-graph" label="Open Graph" />
          <Twitter name="twitter" label="Twitter" />
        </WhpptTab>
        {/* <div className="whppt-popup__contents--right">
        </div> */}
      </div>
    </div>
  );
};
