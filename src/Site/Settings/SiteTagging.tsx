import React, { useEffect, useState } from 'react';
import { WhpptInput, WhpptButton, WhpptTable, WhpptTab } from '../../ui/components';
import { useWhppt } from '../../Context';

export const SiteTagging = ({ name }: WhpptTab) => {
  const { api, domain } = useWhppt();

  const [categoryName, setCategoryName] = useState('');
  const [tagName, setTagName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({} as any);
  const [siteTags, setSiteTags] = useState([] as any);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewTag, setShowNewTag] = useState(false);

  const headers = [{ text: 'Name', value: 'id' }] as any;

  useEffect(() => {
    api.tagging.fetch(domain._id).then(result => {
      setSiteTags(result);
      setSelectedCategory(result[0]);
    });
  }, [api, domain._id]);

  const addNewTag = (_tagName: string) => {
    if (_tagName === '') return;
    const _updatedCategory = { ...selectedCategory, values: [...selectedCategory.values, { id: _tagName, slug: '' }] };

    siteTags.forEach(cat => {
      if (cat.id === selectedCategory.id) cat.values = _updatedCategory.values;
    });

    api.tagging.save({ tags: siteTags, domainId: domain._id }).then(() => requery(selectedCategory.id));
    setTagName('');
  };

  const removeTag = _tag => {
    const _updatedCategory = { ...selectedCategory, values: selectedCategory.values.filter(item => item !== _tag) };

    const newSiteTagList = siteTags.map(obj => {
      if (obj.id == _updatedCategory.id) {
        obj = _updatedCategory;
      }
      return obj;
    });

    api.tagging.save({ tags: newSiteTagList, domainId: domain._id }).then(() => requery(selectedCategory.id));
  };

  const addNewCategory = (_categoryName: string) => {
    siteTags.push({ id: _categoryName, slug: '', values: [] });
    api.tagging.save({ tags: siteTags, domainId: domain._id }).then(() => requery(_categoryName));
    setCategoryName('');
  };
  const requery = (_categoryName?: string) => {
    api.tagging.fetch(domain._id).then(result => {
      setSiteTags(result);
      setCategoryName('');
      setShowNewCategory(false);
      if (_categoryName) {
        setSelectedCategory(result.find(r => r.id === _categoryName));
      }
    });
  };

  return (
    <div>
      <div id={name} className="whppt-tagging-form">
        <div className="whppt-tagging-form__left">
          <div className="whppt-tagging-form-section">
            <div className="whppt-tagging-form__title">Categories</div>

            {siteTags.map(category => {
              return (
                <div
                  key={category.id}
                  className={`whppt-tagging-form__badge ${
                    selectedCategory?.id === category.id ? 'whppt-tagging-form__badge--selected' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}>
                  {category.id}
                </div>
              );
            })}
            <br />
            <br />
            {!selectedCategory ? (
              <p>Add a category to start creating tags</p>
            ) : selectedCategory && selectedCategory.id && selectedCategory.values.length ? (
              <WhpptTable
                headers={headers}
                perPage={10}
                dense={false}
                hideHeaders={false}
                hideFooters={true}
                items={selectedCategory.values}
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
                    action: _tag => {
                      removeTag(_tag);
                    },
                  },
                ]}
              />
            ) : selectedCategory.id ? (
              <div> No tags have been created for this category yet.</div>
            ) : (
              <div>Select a category above to start adding tags</div>
            )}
          </div>
        </div>
        <div className="whppt-tagging-form__right">
          <div className="whppt-tagging-form--flex-end">
            <WhpptButton
              text="Add new category"
              onClick={() => {
                setShowNewTag(false);
                setShowNewCategory(true);
              }}
            />
            {selectedCategory && selectedCategory.id ? (
              <WhpptButton
                text={`Add new tag to category`}
                onClick={() => {
                  setShowNewCategory(false);
                  setShowNewTag(true);
                }}
              />
            ) : (
              <></>
            )}
          </div>
          {showNewCategory ? (
            <div className="whppt-tagging-form-section">
              <div className="whppt-tagging-form__title">Add a new category?</div>
              <div className="whppt-tagging-form__note">Create a new category and populate it with new tags.</div>

              <WhpptInput id="category-input" label="Category Name" type="text" value={categoryName} onChange={setCategoryName} />

              <WhpptButton text="Save" onClick={() => addNewCategory(categoryName)} />
            </div>
          ) : (
            <></>
          )}
          {showNewTag ? (
            <div className="whppt-tagging-form-section">
              <div className="whppt-tagging-form__title">Add new tag to {selectedCategory.id}</div>
              <div className="whppt-tagging-form__note">This tag will be saved within the category of {selectedCategory.id}</div>

              <WhpptInput id="tag-input" label="New Tag Name" type="text" value={tagName} onChange={setTagName} />

              <WhpptButton text="Save" onClick={() => addNewTag(tagName)} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
