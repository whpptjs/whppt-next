import React, { FC, useState } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab, WhpptQueryInput } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';
import { GalleryFileType } from './Api';
import { ImageSettings } from './ImageSettings';
import { ImageData } from './Model/Image';
import { splitKeywords } from '../helpers';
import { FileDetails } from '../Api/Http';

export const Gallery: FC = () => {
  const { settingsPanel, showEditor, changeSettingsPanelActiveTab, api, hideSettingsPanel, domain, page, setPage } = useWhppt();

  const [selected, setSelected] = useState<ImageData>(null);
  const [searchQueryTags, setSearchQueryTags] = useState('');
  const [filter, setFilter] = useState('');

  const tabs: Array<WhpptTab> = [
    { name: 'images', label: 'Images' },
    { name: 'videos', label: 'Videos' },
    { name: 'files', label: 'Files' },
  ];

  const search = (type: GalleryFileType) => {
    const tags = splitKeywords(searchQueryTags) || [];
    return api.gallery.search({ domainId: domain._id, page: 1, size: 10, type, tags }).then(({ items }: { items: FileDetails[] }) => items);
  };

  const upload = newFile => {
    return api.gallery.upload(newFile);
  };

  const save = details => {
    return api.gallery.save(details);
  };

  const remove = id => {
    return api.gallery.remove(id).then(() => {
      setSelected(null);
    });
  };

  return (
    <div className="whppt-gallery">
      <div className="whppt-gallery__content">
        <WhpptHeading text="Media Gallery" />
        <div className="whppt-gallery__filters">
          <WhpptQueryInput value={searchQueryTags} onChange={setSearchQueryTags} buttonText={'Search'} onClick={() => search} />
          <WhpptQueryInput value={filter} onChange={setFilter} buttonText={'Filter'} onClick={() => search} />
        </div>
        <WhpptTabs tabs={tabs} selectTab={changeSettingsPanelActiveTab} selectedTab={settingsPanel.activeTab} />
        <WhpptTab selectedTab={settingsPanel.activeTab}>
          {!settingsPanel.activeTab || (settingsPanel.activeTab && settingsPanel.activeTab === 'images') ? (
            <Images
              name="images"
              label="Images"
              search={search}
              upload={upload}
              save={save}
              setSelected={setSelected}
              selectedId={selected && selected._id}
              domainId={domain._id}
            />
          ) : (
            <></>
          )}
          {!settingsPanel.activeTab || (settingsPanel.activeTab && settingsPanel.activeTab === 'video') ? (
            <Videos
              name="videos"
              label="Videos"
              search={search}
              upload={upload}
              save={save}
              setSelected={setSelected}
              selectedId={selected && selected._id}
              domainId={domain._id}
            />
          ) : (
            <></>
          )}
        </WhpptTab>
      </div>

      <div className={`whppt-gallery__settings ${selected ? 'whppt-gallery__settings--active' : ''}`}>
        {selected && (
          <ImageSettings
            use={() => {
              showEditor('image', page, setPage, undefined);
              hideSettingsPanel();
            }}
            remove={() => remove(selected._id)}
            save={save}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </div>
  );
};
