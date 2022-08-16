import React, { FC, useState, useEffect, useCallback } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab, WhpptQueryInput, WhpptSelect } from '../ui/components';
import { Images } from './Images';
import { Videos } from './Videos';
import { Svgs } from './Svgs';
import { GalleryFileType } from './Model';
import { GalleryItemSettings } from './GalleryItemSettings';
import { GalleryItem } from './Model';
import { capitalizeFirstLetter } from '../helpers';
import { splitKeywords } from '../splitKeywords';
import { toast } from 'react-toastify';

const tabs: Array<WhpptTab> = [
  { name: 'image', label: 'Images' },
  { name: 'video', label: 'Videos' },
  { name: 'file', label: 'Files' },
  { name: 'svg', label: 'SVG' },
];

export const Gallery: FC<{ onUse?: (image: GalleryItem) => void }> = ({ onUse }) => {
  const { settingsPanel, changeSettingsPanelActiveTab, api, hideSettingsPanel, domain } = useWhppt();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem>(null);
  const [searchQueryTags, setSearchQueryTags] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<'loading' | 'loaded'>('loading');
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const search = useCallback(() => {
    setError('');

    const tags = splitKeywords(searchQueryTags) || [];
    const type = settingsPanel.activeTab as GalleryFileType;
    const search = api.gallery
      .search({ domainId: domain._id, page: 1, size: 10, type, tags, filter })
      .then(({ items }: { items: GalleryItem[] }) => setItems(items))
      .catch(error => setError(error.message || error));

    return toast.promise(search, {
      error: `${capitalizeFirstLetter(settingsPanel.activeTab)} search failed 🤯`,
    });
  }, [api.gallery, domain._id, searchQueryTags, settingsPanel.activeTab, filter]);

  useEffect(() => {
    if (loading === 'loading') return setLoading('loaded');
    if (loading === 'loaded') search();
  }, [loading, search, settingsPanel.activeTab]);

  const upload = newFile => {
    const upload = api.gallery.upload(newFile).then(file => setItems([...items, file]));

    return toast.promise(upload, {
      pending: `Uploading ${capitalizeFirstLetter(settingsPanel.activeTab)}...`,
      success: `${capitalizeFirstLetter(settingsPanel.activeTab)} uploaded`,
      error: `${capitalizeFirstLetter(settingsPanel.activeTab)} upload failed 🤯`,
    });
  };

  const remove = id => {
    const remove = api.gallery.remove(id).then(() => {
      setSelected(null);
      setItems(items.filter(({ _id }) => _id == id));
    });

    return toast.promise(remove, {
      pending: `Deleting ${capitalizeFirstLetter(settingsPanel.activeTab)}...`,
      success: `${capitalizeFirstLetter(settingsPanel.activeTab)} deleted`,
      error: `${capitalizeFirstLetter(settingsPanel.activeTab)} delete failed 🤯`,
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

          <WhpptTabs
            tabs={tabs}
            selectTab={selectedTab => {
              setItems([]);
              setSelected(null);
              changeSettingsPanelActiveTab(selectedTab);
            }}
            selectedTab={settingsPanel.activeTab}
          />

          {error ? <h1>Search failed</h1> : <></>}
        </div>

        <WhpptTab selectedTab={settingsPanel.activeTab}>
          {!settingsPanel.activeTab || (settingsPanel.activeTab && settingsPanel.activeTab === 'image') ? (
            <Images
              name="images"
              label="Images"
              items={items}
              upload={upload}
              setSelected={image => {
                setSelected(image);
                setSettingsOpen(true);
              }}
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
              setSelected={video => {
                setSelected(video);
                setSettingsOpen(true);
              }}
              selectedId={selected && selected._id}
            />
          ) : (
            <></>
          )}

          {!settingsPanel.activeTab || (settingsPanel.activeTab && settingsPanel.activeTab === 'svg') ? (
            <Svgs name="svg" label="SVG" items={items} upload={upload} setSelected={setSelected} selectedId={selected && selected._id} />
          ) : (
            <></>
          )}
        </WhpptTab>
      </div>

      <div className={`whppt-gallery-settings ${selected && settingsOpen ? 'whppt-gallery-settings--active' : ''}`}>
        {selected && (
          <GalleryItemSettings
            use={
              onUse
                ? updatedItem => {
                    onUse(updatedItem as GalleryItem);
                    hideSettingsPanel();
                  }
                : undefined
            }
            remove={() => remove(selected._id)}
            selectedId={selected._id}
            close={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
