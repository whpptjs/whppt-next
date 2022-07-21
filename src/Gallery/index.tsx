import React, { FC, useState } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab, WhpptQueryInput } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';
import { GalleryFileType } from './Api';

export const Gallery: FC = () => {
  const { gallery, changeGalleryActiveTab, api, hideGallery } = useWhppt();
  const [selected, setSelected] = useState<FileDetails>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

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
    <div className="whppt-gallery" style={{ height: '100vh' }}>
      <div className="whppt-gallery__content" style={{ display: 'flex', flexDirection: 'column' }}>
        <WhpptHeading text="Media Gallery" />
        <div className="whppt-gallery__filters">
          <WhpptQueryInput value={searchQuery} onChange={setSearchQuery} buttonText={'Search'} onClick={search} />
          <WhpptQueryInput value={filter} onChange={setFilter} buttonText={'Filter'} onClick={search} />
        </div>
        <WhpptTabs tabs={tabs} selectTab={changeGalleryActiveTab} selectedTab={gallery.activeTab} />
        <WhpptTab selectedTab={gallery.activeTab}>
          {!gallery.limitType || (gallery.limitType && gallery.limitType === 'image') ? (
            <Images
              name="images"
              label="Images"
              search={search}
              upload={upload}
              save={save}
              remove={remove}
              setSelected={setSelected}
              selectedId={selected && selected._id}
            />
          ) : (
            <></>
          )}
          {!gallery.limitType || (gallery.limitType && gallery.limitType === 'video') ? (
            <Videos
              name="videos"
              label="Videos"
              search={search}
              upload={upload}
              save={save}
              remove={remove}
              setSelected={setSelected}
              selectedId={selected && selected._id}
            />
          ) : (
            <></>
          )}
        </WhpptTab>
      </div>

      <div className={'whppt-gallery__settings'}>
        <Settings
          use={() => {
            gallery.use(selected);
            hideGallery();
          }}
          remove={() => remove(selected._id)}
          save={() => save}
          suggestedTags={getSuggestedTags(selected)}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
