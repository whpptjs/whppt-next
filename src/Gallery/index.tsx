import React, { FC, useState, useEffect, useCallback } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab, WhpptQueryInput, WhpptSelect } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';
import { GalleryFileType } from './Model';
import { GalleryItemSettings } from './GalleryItemSettings';
import { GalleryItem } from './Model';
import { capitalizeFirstLetter } from '../helpers';
import { splitKeywords } from '../splitKeywords';

const tabs: Array<WhpptTab> = [
  { name: 'image', label: 'Images' },
  { name: 'video', label: 'Videos' },
  { name: 'file', label: 'Files' },
];

export const Gallery: FC<{ onUse?: (image: GalleryItem) => void }> = ({ onUse }) => {
  const { settingsPanel, changeSettingsPanelActiveTab, api, hideSettingsPanel, domain } = useWhppt();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem>(null);
  const [searchQueryTags, setSearchQueryTags] = useState('');
  const [filter, setFilter] = useState('');

  const [loading, setLoading] = useState<'loading' | 'loaded'>('loading');
  const [error, setError] = useState('');

  const search = useCallback(() => {
    const tags = splitKeywords(searchQueryTags) || [];
    const type = settingsPanel.activeTab as GalleryFileType;

    return api.gallery
      .search({ domainId: domain._id, page: 1, size: 10, type, tags, filter })
      .then(({ items }: { items: GalleryItem[] }) => setItems(items))
      .catch(error => setError(error.message || error));
  }, [api.gallery, domain._id, searchQueryTags, settingsPanel.activeTab, filter]);

  useEffect(() => {
    if (loading === 'loading') return setLoading('loaded');
    if (loading === 'loaded') search();
  }, [loading, search]);

  const upload = (newFile: FormData) => {
    return api.gallery.upload(newFile).then(file => setItems([...items, file]));
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
          <WhpptQueryInput
            value={searchQueryTags}
            onChange={setSearchQueryTags}
            buttonText={'Search'}
            onEnterKeyPressed={setSearchQueryTags}
          />
          {searchQueryTags && (
            <WhpptSelect
              label="Filter"
              getOptionLabel={item => item.label}
              items={splitKeywords(searchQueryTags).map(item => {
                return { value: item, label: capitalizeFirstLetter(item) };
              })}
              onChange={({ value }) => setFilter(value)}
              value={{ value: filter, label: capitalizeFirstLetter(filter) }}
              isOptionSelected={({ value }) => value === filter}
              isClearable
            />
          )}
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
              onUse && onUse(selected as GalleryItem);
              hideSettingsPanel();
            }}
            remove={() => remove(selected._id)}
            selectedId={selected._id}
          />
        )}
      </div>
    </div>
  );
};
