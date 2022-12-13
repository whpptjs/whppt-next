import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { WhpptHeading } from '../ui/components/Heading';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab, WhpptQueryInput, WhpptSelect, WhpptIcon } from '../ui/components';
import { WhpptGalleryTab, WhpptGalleryImage, WhpptGallerySvg } from './Components';
import { GalleryFileType, GalleryItem } from './Model';
import { GalleryItemSettings } from './GalleryItemSettings';
import { capitalizeFirstLetter } from '../helpers';
import { splitKeywords } from '../splitKeywords';
import { toast } from 'react-toastify';
import { WhpptPagination } from '../ui/components/Pagination';

const internalTabs: Array<WhpptTab> = [
  { name: 'image', label: 'Images', disabled: false },
  { name: 'svg', label: 'SVG', disabled: false },
];

const selectOptions = {
  image: [
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ],
  svg: [
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 200, label: '200' },
  ],
};

export const Gallery: FC<{ onUse?: (image: GalleryItem) => void }> = ({ onUse }) => {
  const { galleryPanel, changeGalleryPanelActiveTab, api, hideGalleryPanel, domain } = useWhppt();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem>(null);
  const [searchQueryTags, setSearchQueryTags] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<'loading' | 'loaded'>('loading');
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(selectOptions[galleryPanel.activeTab][0].value);
  const [total, setTotal] = useState(0);

  const search = useCallback(() => {
    setError('');

    const tags = splitKeywords(searchQueryTags) || [];
    const type = galleryPanel.activeTab as GalleryFileType;
    const search = api.gallery
      .search({ domainId: domain._id, page, size, type, tags, filter })
      .then(({ items, total }: { items: GalleryItem[]; total: number }) => {
        setItems(items);
        total && setTotal(total);
      })
      .catch(error => setError(error.message || error));

    return toast.promise(search, {
      error: `${capitalizeFirstLetter(galleryPanel.activeTab)} search failed 🤯`,
    });
  }, [api.gallery, domain._id, searchQueryTags, galleryPanel.activeTab, filter, page, size]);

  useEffect(() => {
    if (loading === 'loading') return setLoading('loaded');
    if (loading === 'loaded') search();
  }, [loading, search, galleryPanel.activeTab]);

  const tabs: Array<WhpptTab> = useMemo(
    () =>
      onUse
        ? internalTabs.map(tab => ({ ...tab, disabled: onUse && galleryPanel.activeTab !== tab.name }))
        : internalTabs.map(tab => ({ ...tab, disabled: false })),
    [onUse, galleryPanel.activeTab]
  );

  const upload = newFile => {
    const upload = api.gallery.upload(newFile).then(file => setItems([...items, file]));

    return toast.promise(upload, {
      pending: `Uploading ${capitalizeFirstLetter(galleryPanel.activeTab)}...`,
      success: `${capitalizeFirstLetter(galleryPanel.activeTab)} uploaded`,
      error: `${capitalizeFirstLetter(galleryPanel.activeTab)} upload failed 🤯`,
    });
  };

  const remove = id => {
    const remove = api.gallery.remove(id, galleryPanel.activeTab).then(() => {
      setSelected(null);
      setItems(items.filter(({ _id }) => _id == id));
    });

    return toast.promise(remove, {
      pending: `Deleting ${capitalizeFirstLetter(galleryPanel.activeTab)}...`,
      success: `${capitalizeFirstLetter(galleryPanel.activeTab)} deleted`,
      error: `${capitalizeFirstLetter(galleryPanel.activeTab)} delete failed 🤯`,
    });
  };

  const getComponent = () => {
    return {
      image: WhpptGalleryImage,
      svg: WhpptGallerySvg,
    }[galleryPanel.activeTab];
  };

  return (
    <div className="whppt-gallery">
      <div className="whppt-gallery__content">
        <div className="whppt-gallery__title">
          <WhpptHeading text="Media Gallery" />
          <button className="whppt-gallery__close" onClick={hideGalleryPanel}>
            <WhpptIcon is="close" />
          </button>
        </div>
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
              changeGalleryPanelActiveTab(selectedTab);
            }}
            selectedTab={galleryPanel.activeTab}
          />

          {error ? <h1>Search failed</h1> : <></>}
        </div>

        <WhpptGalleryTab
          type={galleryPanel.activeTab as GalleryFileType}
          items={items}
          upload={upload}
          setSelected={item => {
            setSelected(item);
            setSettingsOpen(true);
          }}
          selectedId={selected && selected._id}
          Component={getComponent()}
        />

        <div className="whppt-gallery__footer">
          asd
          <WhpptPagination
            page={page}
            perPage={size}
            selectOptions={selectOptions[galleryPanel.activeTab as GalleryFileType]}
            total={total}
            changePage={setPage}
            setPerPage={setSize}
          />
        </div>
      </div>

      <div className={`whppt-gallery-settings ${selected && settingsOpen ? 'whppt-gallery-settings--active' : ''}`}>
        {selected && (
          <GalleryItemSettings
            use={
              onUse
                ? updatedItem => {
                    onUse(updatedItem as GalleryItem);
                    hideGalleryPanel();
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
