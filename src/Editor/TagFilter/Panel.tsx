import React, { FC, useCallback, useEffect, useState } from 'react';
import { WhpptCheckbox, WhpptInput, WhpptSelect } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';
import { useWhppt } from '../../Context';
import { Reorder } from 'framer-motion';
import { ListItem } from './ListItem';

import { WhpptIconClose } from '../../icons/Close';

const sortByOptions = [
  { name: 'Title (A-Z)', value: 'Title (A-Z)' },
  { name: 'Title (Z-A)', value: 'Title (Z-A)' },
  { name: 'Publish Date (Earliest)', value: 'Publish Date (Earliest)' },
  { name: 'Publish Date (Latest)', value: 'Publish Date (Latest)' },
];
const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];

export const WhpptTagFilterPanel: FC<EditorArgs<string>> = () => {
  // console.log(1 + 1 == 1 ? value : onChange);
  const { api, domain } = useWhppt();

  const [showAllItems, setShowAllItems] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [manualSort, setManualSort] = useState(false);
  const [sortByFilter, setSortByFilter] = useState([]);

  const [siteTags, setSiteTags] = useState([] as any);
  const [includeTagInput, setIncludeTagInput] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [tagsToInclude, setTagsToInclude] = useState([]);

  const [items, setItems] = useState(initialItems);

  const concatCategoriesAndTags = useCallback(data => {
    const concatCatAndTagArray = [];

    data.map(cat => {
      cat.values.map(tag => {
        concatCatAndTagArray.push(cat.id.concat(':', tag.id));
      });
    });

    setSiteTags(concatCatAndTagArray);
  }, []);

  useEffect(() => {
    api.tagging.fetch(domain._id).then(data => {
      concatCategoriesAndTags(data);
    });
  }, [api.tagging, concatCategoriesAndTags, domain._id]);

  useEffect(() => {
    const _suggestedList = [];
    siteTags.find(element => {
      if (element.toLowerCase().includes(includeTagInput.toLowerCase())) {
        _suggestedList.push(element);
      }
    });
    setAutoCompleteResults(_suggestedList);
  }, [includeTagInput, siteTags]);

  const addPageTagToInclude = tag => {
    console.log(tag);
    if (tagsToInclude.some(substring => tag.includes(substring))) {
      setIncludeTagInput('');
      return;
    }
    setTagsToInclude(prevState => [...prevState, tag]);

    setIncludeTagInput('');
  };

  return (
    <div className="whppt-tag-filter-editor">
      <p>Tag Filter Panel</p>

      <WhpptCheckbox label={'Show all items'} value={showAllItems} onChange={setShowAllItems} />
      <WhpptInput
        type="number"
        value={`${itemsToShow}`}
        onChange={e => `${setItemsToShow(Number(e))}`}
        id={'showItems'}
        label={'Number of items to show'}
      />
      <WhpptCheckbox label={'Manual sort'} value={manualSort} onChange={setManualSort} />
      <WhpptSelect<{ name: string; value: string }>
        id="whppt-sort-by-filter"
        label={'Sort by'}
        items={sortByOptions}
        value={sortByFilter}
        onChange={item => setSortByFilter(item)}
        getOptionLabel={option => option.name}
      />

      <WhpptInput id="tagging-input" label="Select tags to include" type="text" value={includeTagInput} onChange={setIncludeTagInput} />
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
      <p>Selected pages:</p>
      <Reorder.Group axis="y" onReorder={setItems} values={items}>
        {items.map(item => (
          <ListItem key={item} item={item} />
        ))}
      </Reorder.Group>
    </div>
  );
};
