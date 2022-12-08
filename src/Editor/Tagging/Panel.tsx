import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { WhpptInput, WhpptTable } from '../../ui/components';
import { useWhppt } from '../../Context';

export const WhpptPageTaggingPanel = () => {
  const { api, domain, page, setPage } = useWhppt();

  const [tagInput, setTagInput] = useState('');
  const [siteTags, setSiteTags] = useState([] as any);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  const headers = [{ text: 'Name', value: 'id' }] as any;

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
      if (element.toLowerCase().includes(tagInput.toLowerCase())) {
        _suggestedList.push(element);
      }
    });

    setAutoCompleteResults(_suggestedList);
  }, [tagInput, siteTags]);

  const addPageTag = tag => {
    setPage({ ...page, tags: [...(page.tags || []), tag] });

    setTagInput('');
  };

  const removePageTag = tag => {
    const _tags = page.tags.filter(tags => !tags.match(tag));

    setPage({ ...page, tags: _tags || [] });
  };

  const pageTags = useMemo(() => (page.tags ? page.tags.map(t => ({ id: t })) : []), [page?.tags]);

  return (
    <div>
      <h2>Page Tagging</h2>

      <WhpptInput id="tagging-input" label="Tags" type="text" value={tagInput} onChange={setTagInput} />
      {tagInput.length > 0 && (
        <div className="whppt-tagging-autocomplete-input">
          <div className="whppt-tagging-autocomplete-input__container">
            {tagInput.length > 0 && autoCompleteResults.length ? (
              autoCompleteResults.map(tag => (
                <div key={tag} className="whppt-tagging-autocomplete-input__result" onClick={() => addPageTag(tag)}>
                  <p>{tag}</p>
                </div>
              ))
            ) : (
              <div className="whppt-tagging-autocomplete-input__result">
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      )}

      <WhpptTable
        headers={headers}
        perPage={10}
        dense={false}
        hideHeaders={false}
        hideFooters={true}
        items={pageTags}
        height={''}
        fixedHeader={false}
        page={1}
        total={0}
        setCurrentPage={function (): void {
          throw new Error('Function not implemented.');
        }}
        setPerPage={() => 10}
        actions={[
          {
            icon: 'unpublish',
            info: 'Remove Tag',
            action: _tag => removePageTag(_tag.id),
          },
        ]}
      />
    </div>
  );
};
