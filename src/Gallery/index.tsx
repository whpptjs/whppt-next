import React, { FC } from 'react';
import { Heading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';

export const Gallery: FC = () => {
  const { gallery, changeGalleryActiveTab } = useWhppt();
  const tabs: Array<WhpptTab> = [
    { name: 'images', label: 'Images' },
    { name: 'videos', label: 'Videos' },
    { name: 'files', label: 'Files' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 1 0' }}>
        <Heading text="Media Gallery" />
        <div>Search</div>
        <WhpptTabs tabs={tabs} selectTab={changeGalleryActiveTab} selectedTab={gallery.activeTab} />
        <WhpptTab selectedTab={gallery.activeTab}>
          <Images name="images" label="Images" />
          <Videos name="videos" label="Videos" />
        </WhpptTab>
      </div>
    </div>
  );
};
