import React, { FC, useCallback, useEffect, useState } from 'react';
import { WhpptCheckbox, WhpptInput, WhpptSelect } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';
import { useWhppt } from '../../Context';
import { Reorder, useMotionValue } from 'framer-motion';
import { WhpptIconOrder } from '../../icons/Order';
import { WhpptIconClose } from '../../icons/Close';

const sortByOptions = [
  { name: 'Title (A-Z)', value: 'Title (A-Z)', sort: { fields: { 'header.heading': 1 }, sortType: 'string', text: 'Title (a-z)' } },
  { name: 'Title (Z-A)', value: 'Title (Z-A)', sort: { fields: { 'header.heading': -1 }, sortType: 'string', text: 'Title (z-a)' } },
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

export const WhpptTagFilterPanel: FC<EditorArgs<string>> = () => {
  const { api, domain } = useWhppt();
  const y = useMotionValue(0);
  const [tagFilters, setTagFilters] = useState({
    include: [],
    exclude: [],
    selected: [],
    ignoreLimit: false,
    ignoreSort: false,
    limit: '8',
    sort: { fields: {}, sortType: '', text: '' },
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [siteTags, setSiteTags] = useState([]);
  const [includedTagSearch] = useState('');
  const [excludedTagSearch] = useState('');
  const [sortByFilter, setSortByFilter] = useState({ name: '', value: '' });
  const [manualOrder, setManualOrder] = useState([]);

  // console.log(tagFilters);
  useEffect(() => {
    api.tagging.filterListSelected({ domainId: domain._id, tagFilters }).then(data => {
      setSelectedItems(data);
    });
  }, [api.tagging, domain._id, tagFilters.ignoreLimit, tagFilters.ignoreSort, tagFilters.sort, tagFilters.selected]);

  useEffect(() => {
    api.tagging.filterList({ domainId: domain._id, tagFilters }).then(data => {
      setFilteredItems(data);
    });
  }, [api.tagging, domain._id, tagFilters.include, tagFilters.exclude, tagFilters.selected]);

  // const [manualSort, setManualSort] = useState(false);
  // const [sortByFilter, setSortByFilter] = useState([]);
  // const [siteTags, setSiteTags] = useState([] as any);
  // const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  // const [includeTagInput, setIncludeTagInput] = useState('');
  // const [tagsToInclude, setTagsToInclude] = useState([]);
  // const [tagsToExclude, setTagsToExclude] = useState([]);
  // const [excludeTagInput, setExcludeTagInput] = useState('');
  // const [selectedPages, setSelectedPages] = useState([]);
  // const [filteredPages, setFilteredPages] = useState(initialItems);

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
    setManualOrder(newOrder);

    const myNewOrder = newOrder.map(item => item._id);
    console.log(myNewOrder);
    setTagFilters({ ...tagFilters, selected: myNewOrder });
  };

  return (
    <div className="whppt-tag-filter-editor">
      <p>Tag Filter Panel</p>

      <WhpptCheckbox
        label={'Show all items'}
        value={tagFilters.ignoreLimit}
        onChange={() => setTagFilters({ ...tagFilters, ignoreLimit: !tagFilters.ignoreLimit })}
      />

      <WhpptInput
        type="number"
        value={tagFilters.limit}
        onChange={e => setTagFilters({ ...tagFilters, limit: e })}
        id={'showItems'}
        label={'Number of items to show'}
        disabled={tagFilters.ignoreLimit}
      />
      <WhpptCheckbox
        label={'Manual sort'}
        value={tagFilters.ignoreSort}
        onChange={() => setTagFilters({ ...tagFilters, ignoreSort: !tagFilters.ignoreSort })}
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

      <WhpptSelect
        id={'include-tags'}
        label={'Select tags to include'}
        value={includedTagSearch}
        onChange={p => addPageTagToInclude(p)}
        items={siteTags}
        getOptionLabel={option => option.value}
      />

      <p>Current included tags:</p>
      <div>
        {tagFilters.include.length > 0 &&
          tagFilters.include.map(tag => (
            <div className="whppt-tag-filter__badge" key={tag}>
              {tag}
              <figure
                className="whppt-tag-filter__badge--close"
                onClick={() => setTagFilters({ ...tagFilters, include: tagFilters.include.filter(item => item !== tag) })}>
                <WhpptIconClose />
              </figure>
            </div>
          ))}
      </div>

      <WhpptSelect
        id={'exclude-tags'}
        label={'Select tags to exclude'}
        value={excludedTagSearch}
        onChange={p => addPageTagToExclude(p)}
        items={siteTags}
        getOptionLabel={option => option.value}
      />

      <p>Current excluded tags:</p>
      <div>
        {tagFilters.exclude.length > 0 &&
          tagFilters.exclude.map(tag => (
            <div className="whppt-tag-filter__badge" key={tag}>
              {tag}
              <figure
                className="whppt-tag-filter__badge--close"
                onClick={() => setTagFilters({ ...tagFilters, exclude: tagFilters.exclude.filter(item => item !== tag) })}>
                <WhpptIconClose />
              </figure>
            </div>
          ))}
      </div>

      <p>Selected pages:</p>
      <Reorder.Group axis="y" onReorder={newOrder => manualReOrder(newOrder)} values={manualOrder}>
        {manualOrder.map(item => {
          return (
            <Reorder.Item value={item} id={item._id} key={item._id}>
              <div className="whppt-tag-filter__list-item">
                <span className="whppt-tag-filter__list-item--order">
                  <WhpptIconOrder />
                </span>
                <span>{item.header.content.title || 'Unknown page title'}</span>
                {/* <span
                  className="whppt-tag-filter__list-item--close"
                  onClick={() => setSelectedItems(selectedItems.filter(page => page !== item))}>
                  <WhpptIconClose />
                </span> */}
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <p>Filtered pages:</p>
      {filteredItems.map(pageItem => {
        return (
          <div key={pageItem._id}>
            <WhpptCheckbox
              label={pageItem.header.content.title}
              value={false}
              onChange={() => {
                setManualOrder(prevOrder => [...prevOrder, pageItem]);
                setTagFilters({ ...tagFilters, selected: [...tagFilters.selected, pageItem._id] });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
