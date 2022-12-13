import React, { FC, useCallback, useEffect, useState } from 'react';
import { WhpptCheckbox, WhpptInput, WhpptSelect } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';
import { useWhppt } from '../../Context';
// import { Reorder } from 'framer-motion';
// import { ListItem } from './ListItem';

import { WhpptIconClose } from '../../icons/Close';

// const sortByOptions = [
//   { name: 'Title (A-Z)', value: 'Title (A-Z)' },
//   { name: 'Title (Z-A)', value: 'Title (Z-A)' },
//   { name: 'Publish Date (Earliest)', value: 'Publish Date (Earliest)' },
//   { name: 'Publish Date (Latest)', value: 'Publish Date (Latest)' },
// ];

export const WhpptTagFilterPanel: FC<EditorArgs<string>> = () => {
  const { api, domain } = useWhppt();

  const [tagFilters, setTagFilters] = useState({
    include: [],
    exclude: [],
    selected: [],
    ignoreLimit: false,
    ignoreSort: false,
    limit: '8',
  });

  const [selectedItems, setSelectedItems] = useState([]);
  console.log('🚀 ~ file: Panel.tsx:31 ~ selectedItems', selectedItems);
  const [filteredItems, setFilteredItems] = useState([]);
  const [siteTags, setSiteTags] = useState([]);
  const [includedTagSearch] = useState('');

  useEffect(() => {
    api.tagging.filterListSelected({ domainId: domain._id, tagFilters }).then(data => {
      setSelectedItems(data);
    });
  }, [api.tagging, domain._id, tagFilters.ignoreLimit, tagFilters.ignoreSort]);

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

  // useEffect(() => {
  //   const _suggestedList = [];
  //   siteTags.find(element => {
  //     if (element.toLowerCase().includes(includeTagInput.toLowerCase())) {
  //       _suggestedList.push(element);
  //     }
  //   });
  //   setAutoCompleteResults(_suggestedList);
  // }, [includeTagInput, siteTags]);

  const addPageTagToInclude = tag => {
    if (tagFilters.include.some(substring => tag.value.includes(substring))) return;

    setTagFilters({ ...tagFilters, include: [...tagFilters.include, tag.value] });
  };

  // const addPageTagToExclude = tag => {
  //   if (tagsToExclude.some(substring => tag.includes(substring))) {
  //     setExcludeTagInput('');
  //     return;
  //   }
  //   setTagsToExclude(prevState => [...prevState, tag]);

  //   setExcludeTagInput('');
  // };

  // const updateSelectedPages = pageItem => {
  //   setSelectedPages(prevPages => [...prevPages, pageItem]);
  //   setFilteredPages(filteredPages.filter(item => item !== pageItem));
  // };
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
      />
      <WhpptCheckbox
        label={'Manual sort'}
        value={tagFilters.ignoreSort}
        onChange={() => setTagFilters({ ...tagFilters, ignoreSort: !tagFilters.ignoreSort })}
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

      {/* <WhpptInput id="tagging-input" label="Select tags to include" type="text" value={includeTagInput} onChange={setIncludeTagInput} />
      {includeTagInput.length > 0 && (
        <div className="whppt-tagging-autocomplete-input">
          <div className="whppt-tagging-autocomplete-input__container">
            {includeTagInput.length > 0 && autoCompleteResults.length ? (
              autoCompleteResults.map(tag => {
                return (
                  <div key={tag} className="whppt-tagging-autocomplete-input__result" onClick={() => addPageTagToInclude(tag)}>
                    <p>{tag}</p>
                  </div>
                );
              })
            ) : (
              <div className="whppt-tagging-autocomplete-input__result">
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      )} */}
      {/* 
      {!manualSort && (
        <WhpptSelect<{ name: string; value: string }>
          id="whppt-sort-by-filter"
          label={'Sort by'}
          items={sortByOptions}
          value={sortByFilter}
          onChange={item => setSortByFilter(item)}
          getOptionLabel={option => option.name}
        />
      )}


      <p>Current included tags:</p>
      <div>
        {tagsToInclude.length > 0 &&
          tagsToInclude.map(tag => (
            <div className="whppt-tag-filter__badge" key={tag}>
              {tag}
              <figure
                className="whppt-tag-filter__badge--close"
                onClick={() => setTagsToInclude(tagsToInclude.filter(item => item !== tag))}>
                <WhpptIconClose />
              </figure>
            </div>
          ))}
      </div>

      <WhpptInput
        id="tagging-input-exclude-tags"
        label="Select tags to exclude"
        type="text"
        value={excludeTagInput}
        onChange={setExcludeTagInput}
      />
      {excludeTagInput.length > 0 && (
        <div className="whppt-tagging-autocomplete-input">
          <div className="whppt-tagging-autocomplete-input__container">
            {excludeTagInput.length > 0 && autoCompleteResults.length ? (
              autoCompleteResults.map(tag => {
                return (
                  <div key={tag} className="whppt-tagging-autocomplete-input__result" onClick={() => addPageTagToExclude(tag)}>
                    <p>{tag}</p>
                  </div>
                );
              })
            ) : (
              <div className="whppt-tagging-autocomplete-input__result">
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      )}
      <p>Current excluded tags:</p>
      <div>
        {tagsToExclude.length > 0 &&
          tagsToExclude.map(tag => (
            <div className="whppt-tag-filter__badge" key={tag}>
              {tag}
              <figure
                className="whppt-tag-filter__badge--close"
                onClick={() => setTagsToInclude(tagsToExclude.filter(item => item !== tag))}>
                <WhpptIconClose />
              </figure>
            </div>
          ))}
      </div>

      <p>Selected pages:</p>
      <Reorder.Group axis="y" onReorder={setSelectedPages} values={selectedPages}>
        {selectedPages.map(item => (
          <ListItem key={item} item={item} setSelectedPages={setSelectedPages} selectedPages={selectedPages} />
        ))}
      </Reorder.Group> */}
      <p>Filtered pages:</p>
      {filteredItems.map(pageItem => (
        <div key={pageItem}>
          <WhpptCheckbox label={pageItem.header.title} value={false} onChange={() => {}} />
        </div>
      ))}
    </div>
  );
};
