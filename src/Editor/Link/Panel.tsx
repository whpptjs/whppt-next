import React, { FC } from 'react';
import { WhpptLinkData, WhpptTab, WhpptTabs } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';
import { AnchorLinkTab } from './Anchor';
import { ExternalLinkTab } from './External';
import { FileLinkTab } from './File';
import { PageLinkTab } from './Page';

export const WhpptLinkEditor: FC<EditorArgs<WhpptLinkData>> = ({ value, onChange }) => {
  const tabs: Array<WhpptTab> = [
    { name: 'page', label: 'Page' },
    { name: 'external', label: 'External' },
    { name: 'anchor', label: 'Anchor' },
    { name: 'file', label: 'File' },
  ];

  return (
    <div className="whppt-link-editor">
      <WhpptTabs
        tabs={tabs}
        selectedTab={value.type}
        selectTab={type => {
          onChange({ ...value, type });
        }}
      />
      <WhpptTab selectedTab={value.type}>
        <PageLinkTab name="general" label="General" value={value} onChange={onChange}></PageLinkTab>
        <ExternalLinkTab name="external" label="External" value={value} onChange={onChange}></ExternalLinkTab>
        <AnchorLinkTab name="anchor" label="Anchor" value={value} onChange={onChange}></AnchorLinkTab>
        <FileLinkTab name="file" label="File" value={value} onChange={onChange}></FileLinkTab>
      </WhpptTab>
    </div>
  );
};
