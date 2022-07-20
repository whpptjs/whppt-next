import React, { FC } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';
import { GalleryFileType } from './Api';

export const Gallery: FC = () => {
  const { gallery, changeGalleryActiveTab, api } = useWhppt();
  const tabs: Array<WhpptTab> = [
    { name: 'images', label: 'Images' },
    { name: 'videos', label: 'Videos' },
    { name: 'files', label: 'Files' },
  ];

  const search = (type: GalleryFileType) => {
    return api.gallery.search({ page: 1, size: 10, type }).then(({ files }) => files);
  };

  const upload = newFile => {
    const formData = new FormData();
    formData.append('file', newFile);
    return api.gallery.upload(formData);
  };

  const save = details => {
    return api.gallery.save(details);
  };

  const remove = id => {
    return api.gallery.remove(id);
  };

  return (
    <div>
      <WhpptHeading text="Media Gallery" />
      <div>Search</div>
      <WhpptTabs tabs={tabs} selectTab={changeGalleryActiveTab} selectedTab={gallery.activeTab} />
      <WhpptTab selectedTab={gallery.activeTab}>
        {!gallery.limitType || (gallery.limitType && gallery.limitType === 'image') ? (
          <Images name="images" label="Images" search={search} upload={upload} save={save} remove={remove} />
        ) : (
          <></>
        )}
        {!gallery.limitType || (gallery.limitType && gallery.limitType === 'video') ? (
          <Videos name="videos" label="Videos" search={search} upload={upload} save={save} remove={remove} />
        ) : (
          <></>
        )}
      </WhpptTab>
    </div>
  );
};
