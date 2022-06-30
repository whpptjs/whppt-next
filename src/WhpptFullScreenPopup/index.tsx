import React, { FC, useContext, useState, useCallback } from 'react';
import { Whppt } from '../Context';
import { WhpptIcon } from '../Icon';
import { WhpptTabs } from './WhpptTabs'
import { WhpptTab } from './WhpptTab';

import { Seo } from './forms/Seo';
import { OpenGraph } from './forms/OpenGraph';
import { General } from './forms/General';
import { Twitter } from './forms/Twitter';

export type WhpptTab = {
  name: string
  label: string
};

export type WhpptSelectedType = string;

export const WhpptFullScreenPopup: FC = () => {
  const { editing, toggleEditing } = useContext(Whppt);
  const [selectedTab, setSelectedTab] = useState('General');

  const selectTab = useCallback((pageName) => {
    setSelectedTab(pageName);
  }, []);

  const tabs: Array<WhpptTab> = [
    { name: 'general', label: 'General' },
    { name: 's-e-o', label: 'Seo' },
    { name: 'open-graph', label: 'Open Graph' },
    { name: 'twitter', label: 'Twitter' },
  ];

  const item = {
    key: 'select',
    label: 'Select Component',
    icon: 'close',
    action: () => toggleEditing(),
    isActive: editing,
    order: 200,
    group: 'page',
    groupOrder: 200,
  };

  return (
    <div className={`whppt-popup whppt-popup--active`}>
      {/* <div
      className={`whppt-editor ${
        editorState.editor && editing ? 'whppt-editor--active' : ''
      }`}
    > */}
      <div className="whppt-popup__header">
        Whppt Editor
        <button
          className="whppt-editor__header--button"
          onClick={() => item.action && item.action()}
        >
          <WhpptIcon is={item.icon}></WhpptIcon>
        </button>
      </div>
      <div className="whppt-popup__contents">
        <div className="whppt-popup__contents--left">
          <WhpptTabs tabs={tabs} selectTab={selectTab}/>
        </div>
        <div className="whppt-popup__contents--right">
          <WhpptTab selectedTab={selectedTab}>
            <General name="general" label="General"/>
            <Seo name="s-e-o" label="Seo"/>
            <OpenGraph name="open-graph" label="Open Graph"/>
            <Twitter name="twitter" label="Twitter"/>
          </WhpptTab>
        </div>
      </div>
    </div>
  );
};
