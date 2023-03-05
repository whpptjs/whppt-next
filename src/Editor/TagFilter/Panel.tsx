import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { WhpptCheckbox, WhpptInput, WhpptSelect } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';
import { useWhppt } from '../../Context';
import { Reorder } from 'framer-motion';
import { WhpptIconOrder } from '../../icons/Order';
import { WhpptIconClose } from '../../icons/Close';
import parse from 'html-react-parser';

export const DefaultTagFilters = {
  include: [],
  exclude: [],
  selected: [],
  limit: 8,
  ignoreLimit: false,
  ignoreSort: false,
  sort: {},
};

const sortByOptions = [
  { name: 'Title (A-Z)', value: 'Title (A-Z)', sort: { fields: { 'header.content.title': 1 }, sortType: 'string', text: 'Title (a-z)' } },
  { name: 'Title (Z-A)', value: 'Title (Z-A)', sort: { fields: { 'header.content.title': -1 }, sortType: 'string', text: 'Title (z-a)' } },
  {
    name: 'Publish Date (Earliest)',
    value: 'Publish Date (Earliest)',
    sort: {
      fields: { publishDate: 1 },
      sortType: 'publishDate',
      text: 'Publish Date (earliest)',
    },
  },
  {
    name: 'Publish Date (Latest)',
    value: 'Publish Date (Latest)',
    sort: {
      fields: { publishDate: -1 },
      sortType: 'publishDate',
      text: 'Publish Date (latest)',
    },
  },
];

export type WhpptTagFilters = {
  include: string[];
  exclude: string[];
  selected: string[];
  ignoreLimit: boolean;
  ignoreSort: boolean;
  limit: string | number;
  sort: { fields: any; sortType: string; text: string };
};

export const WhpptTagFilterPanel: FC<EditorArgs<WhpptTagFilters>> = ({ value, onChange }) => {
  const { api, domain } = useWhppt();
  const [tagFilters, setTagFilters] = useState({
    include: value?.include || [],
    exclude: value?.exclude || [],
    selected: value?.selected || [],
    ignoreLimit: value?.ignoreLimit || false,
    ignoreSort: value?.ignoreSort || false,
    limit: value?.limit || '8',
    sort: { fields: value?.sort?.fields || {}, sortType: value?.sort?.sortType || '', text: value?.sort?.text || '' },
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [siteTags, setSiteTags] = useState([]);
  const [includedTagSearch] = useState('');
  const [excludedTagSearch] = useState('');
  const [sortByFilter, setSortByFilter] = useState({ name: '', value: '' });

  const [queryInput, setQueryInput] = useState('');

  useEffect(() => {
    if (!tagFilters?.selected?.length) {
      setSelectedItems([]);
      return;
    }
    api.tagging.filterListSelected({ domainId: domain._id, tagFilters }).then(data => {
      setSelectedItems(
        data.map(d => ({ ...d, header: { ...d.header, content: { ...d.header?.content, title: parse(d.header?.content?.title || '') } } }))
      );
    });
  }, [api.tagging, domain._id, tagFilters.ignoreLimit, tagFilters.ignoreSort, tagFilters.sort, tagFilters.selected]);

  useEffect(() => {
    api.tagging.filterList({ domainId: domain._id, tagFilters, queryInput }).then(data => {
      setFilteredItems(
        data.map(d => ({ ...d, header: { ...d.header, content: { ...d.header?.content, title: parse(d.header?.content?.title || '') } } }))
      );
    });
  }, [api.tagging, domain._id, tagFilters.include, tagFilters.exclude, tagFilters.selected, queryInput]);

  useEffect(() => {
    onChange(tagFilters);
  }, [onChange, tagFilters]);

  const concatCategoriesAndTags = useCallback(data => {
    const concatCatAndTagArray = [];

    data.map(cat => {
      cat.values.map(tag => {
        concatCatAndTagArray.push({ _id: cat.id.concat(':', tag.id), value: cat.id.concat(':', tag.id) });
      });
    });

    setSiteTags(concatCatAndTagArray);
  }, []);

  useEffect(() => {
    api.tagging.fetch(domain._id).then(data => {
      concatCategoriesAndTags(data);
    });
  }, [api.tagging, concatCategoriesAndTags, domain._id]);

  const addPageTagToInclude = tag => {
    if (tagFilters.include.some(substring => tag.value.includes(substring))) return;

    setTagFilters({ ...tagFilters, include: [...tagFilters.include, tag.value] });
  };

  const addPageTagToExclude = tag => {
    if (tagFilters.exclude.some(substring => tag.value.includes(substring))) return;

    setTagFilters({ ...tagFilters, exclude: [...tagFilters.exclude, tag.value] });
  };

  const chooseFilterOption = option => {
    setSortByFilter(option);
    setTagFilters({ ...tagFilters, sort: option.sort });
  };

  const manualReOrder = newOrder => {
    if (!tagFilters.ignoreSort) return;
    setSelectedItems(newOrder);
    setTagFilters({ ...tagFilters, selected: newOrder.map(item => item._id) });
  };
  const removeSelected = _id => {
    const newList = selectedItems.filter(page => page._id !== _id);
    setSelectedItems(newList);
    setTagFilters({ ...tagFilters, selected: newList.map(item => item._id) });
  };

  const unselectedItems = useMemo(() => {
    return filteredItems.filter(f => !tagFilters.selected.find(s => s == f._id));
  }, [filteredItems, tagFilters.selected]);

  return (
    <div className="whppt-tag-filter-editor">
      <div className="whppt-tag-filter__group">
        <p className="whppt-tag-filter__label">Tag Filter Panel</p>

        <WhpptCheckbox
          label={'Show all items'}
          value={tagFilters.ignoreLimit}
          onChange={() => setTagFilters({ ...tagFilters, ignoreLimit: !tagFilters.ignoreLimit })}
        />

        <WhpptInput
          type="number"
          value={`${tagFilters.limit}`}
          onChange={e => setTagFilters({ ...tagFilters, limit: e })}
          id={'showItems'}
          label={'Number of items to show'}
          disabled={tagFilters.ignoreLimit}
        />

        <WhpptSelect<{ name: string; value: string }>
          id="whppt-sort-by-filter"
          label={'Sort by'}
          items={sortByOptions}
          value={sortByFilter}
          onChange={option => chooseFilterOption(option)}
          getOptionLabel={option => option.name}
          isDisabled={tagFilters.ignoreSort}
        />
      </div>
      <div className="whppt-tag-filter__group">
        <WhpptSelect
          id={'include-tags'}
          label={'Select tags to include'}
          value={includedTagSearch}
          onChange={p => addPageTagToInclude(p)}
          items={siteTags}
          getOptionLabel={option => option.value}
        />

        <p className="whppt-tag-filter__label">Current included tags:</p>
        <div>
          {tagFilters.include.length > 0 ? (
            tagFilters.include.map(tag => (
              <div className="whppt-tag-filter__badge" key={tag}>
                {tag}
                <figure
                  className="whppt-tag-filter__badge--close"
                  onClick={() => setTagFilters({ ...tagFilters, include: tagFilters.include.filter(item => item !== tag) })}>
                  <WhpptIconClose />
                </figure>
              </div>
            ))
          ) : (
            <p className="whppt-tag-filter__info">All tags are included.</p>
          )}
        </div>
      </div>

      <div className="whppt-tag-filter__group">
        <WhpptSelect
          id={'exclude-tags'}
          label={'Select tags to exclude'}
          value={excludedTagSearch}
          onChange={p => addPageTagToExclude(p)}
          items={siteTags}
          getOptionLabel={option => option.value}
        />

        <p className="whppt-tag-filter__label">Current excluded tags:</p>
        <div>
          {tagFilters.exclude.length > 0 ? (
            tagFilters.exclude.map(tag => (
              <div className="whppt-tag-filter__badge" key={tag}>
                {tag}
                <figure
                  className="whppt-tag-filter__badge--close"
                  onClick={() => setTagFilters({ ...tagFilters, exclude: tagFilters.exclude.filter(item => item !== tag) })}>
                  <WhpptIconClose />
                </figure>
              </div>
            ))
          ) : (
            <p className="whppt-tag-filter__info">No tags are excluded.</p>
          )}
        </div>
      </div>
      <div className="whppt-tag-filter__group">
        <div className="whppt-tag-filter--flex-apart">
          <p className="whppt-tag-filter__label">Selected pages:</p>
          <WhpptCheckbox
            label={'Manual sort'}
            value={tagFilters.ignoreSort}
            onChange={() => setTagFilters({ ...tagFilters, ignoreSort: !tagFilters.ignoreSort })}
          />
        </div>
        {!selectedItems?.length ? (
          <p className="whppt-tag-filter__info">No pages are selected. So the filter will honor the tags included / excluded. </p>
        ) : (
          <></>
        )}
        <Reorder.Group axis="y" onReorder={newOrder => manualReOrder(newOrder)} values={selectedItems}>
          {selectedItems.map(item => {
            return (
              <Reorder.Item draggable={!tagFilters.ignoreSort} value={item} id={item._id} key={item._id}>
                <div className="whppt-tag-filter__list-item">
                  <span className="whppt-tag-filter__list-item--order">
                    <WhpptIconOrder />
                  </span>
                  <span>{item.header.content.title || 'Unknown page title'}</span>
                  <span
                    className="whppt-tag-filter__list-item--close"
                    onClick={() => {
                      removeSelected(item._id);
                    }}>
                    <WhpptIconClose />
                  </span>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
      {unselectedItems.length ? (
        <>
          <div className="whppt-tag-filter__group">
            <p className="whppt-tag-filter__label">Filtered pages:</p>
            {unselectedItems.map(pageItem => {
              return (
                <div key={pageItem._id}>
                  <WhpptCheckbox
                    label={pageItem.header.content.title}
                    value={false}
                    onChange={() => {
                      if (tagFilters.selected.find(s => s === pageItem._id)) return;
                      setTagFilters({ ...tagFilters, selected: [...tagFilters.selected, pageItem._id] });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="whppt-tag-filter__group">
        <WhpptInput id="query-input" label="Filter by header title" type="text" value={queryInput} onChange={setQueryInput} />
      </div>
    </div>
  );
};
