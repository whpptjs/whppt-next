import React, { FC, useState, useEffect, useCallback } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab, WhpptQueryInput } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';
import { GalleryFileType } from './Model';
import { GalleryItemSettings } from './GalleryItemSettings';
import { ImageItemData } from './Model/Image';
import { splitKeywords } from '../helpers';
import { FileDetails } from '../Api/Http';

const tabs: Array<WhpptTab> = [
  { name: 'image', label: 'Images' },
  { name: 'video', label: 'Videos' },
  { name: 'file', label: 'Files' },
];

export const Gallery: FC<{ onUse?: (image: ImageItemData) => void }> = ({ onUse }) => {
  const { settingsPanel, changeSettingsPanelActiveTab, api, hideSettingsPanel, domain } = useWhppt();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState<FileDetails>(null);
  const [searchQueryTags, setSearchQueryTags] = useState('');
  //const [filter, setFilter] = useState('');

  const [loading, setLoading] = useState<'loading' | 'loaded'>('loading');
  const [error, setError] = useState('');

  const search = useCallback(() => {
    const tags = splitKeywords(searchQueryTags) || [];
    const type = settingsPanel.activeTab as GalleryFileType;

    return api.gallery
      .search({ domainId: domain._id, page: 1, size: 10, type, tags, filter: '' })
      .then(({ items }: { items: FileDetails[] }) => setItems(items))
      .catch(error => setError(error.message || error));
  }, [api.gallery, domain._id, searchQueryTags, settingsPanel.activeTab]);

  useEffect(() => {
    if (loading === 'loading') return setLoading('loaded');
    if (loading === 'loaded') search();
  }, [loading, search]);

  const upload = newFile => {
    return api.gallery.upload(newFile).then(file => setItems([...items, file]));
  };

  const save = details => {
    return api.gallery.save(details);
  };

  const remove = id => {
    return api.gallery.remove(id).then(() => {
      setSelected(null);
      setItems(items.filter(({ _id }) => _id == id));
    });
  };

  return (
    <div className="whppt-gallery">
      <div className="whppt-gallery__content">
        <WhpptHeading text="Media Gallery" />
        <div className="whppt-gallery__filters">
          <WhpptQueryInput value={searchQueryTags} onChange={setSearchQueryTags} buttonText={'Search'} />
          {/* {searchQueryTags && <WhpptSelect label="filter" items={splitKeywords(searchQueryTags)} onChange={setFilter} value={filter} />} */}
        </div>
        <WhpptTabs tabs={tabs} selectTab={changeSettingsPanelActiveTab} selectedTab={settingsPanel.activeTab} />
        <WhpptTab selectedTab={settingsPanel.activeTab}>
          {!settingsPanel.activeTab || (settingsPanel.activeTab && settingsPanel.activeTab === 'image') ? (
            <Images
              name="images"
              label="Images"
              items={items}
              upload={upload}
              setSelected={setSelected}
              selectedId={selected && selected._id}
            />
          ) : (
            <></>
          )}
          {!settingsPanel.activeTab || (settingsPanel.activeTab && settingsPanel.activeTab === 'video') ? (
            <Videos
              name="videos"
              label="Videos"
              items={items}
              upload={upload}
              setSelected={setSelected}
              selectedId={selected && selected._id}
            />
          ) : (
            <></>
          )}
        </WhpptTab>
        {error}
      </div>

      <div className={`whppt-gallery__settings ${selected ? 'whppt-gallery__settings--active' : ''}`}>
        {selected && (
          <GalleryItemSettings
            use={() => {
              onUse && onUse(selected as ImageItemData);
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
