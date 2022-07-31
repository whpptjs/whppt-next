import React, { FC, useState, useEffect } from 'react';
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

export const Gallery: FC<{ device: string }> = ({ device }) => {
  const { settingsPanel, showEditor, changeSettingsPanelActiveTab, api, hideSettingsPanel, domain, page, setPage } = useWhppt();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState<ImageData>(null);
  const [searchQueryTags, setSearchQueryTags] = useState('');
  const [filter, setFilter] = useState('');

  const tabs: Array<WhpptTab> = [
    { name: 'image', label: 'Images' },
    { name: 'video', label: 'Videos' },
    { name: 'file', label: 'Files' },
  ];

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    const tags = splitKeywords(searchQueryTags) || [];
    const type = settingsPanel.activeTab as GalleryFileType;

    return api.gallery
      .search({ domainId: domain._id, page: 1, size: 10, type, tags })
      .then(({ items }: { items: FileDetails[] }) => setItems(items));
  };

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
          <WhpptQueryInput value={searchQueryTags} onChange={setSearchQueryTags} buttonText={'Search'} onClick={search} />
          <WhpptQueryInput value={filter} onChange={setFilter} buttonText={'Filter'} onClick={() => search} />
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
              domainId={domain._id}
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
              showEditor('image', page, setPage, { device, contentType: 'Gallery', selected });
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
