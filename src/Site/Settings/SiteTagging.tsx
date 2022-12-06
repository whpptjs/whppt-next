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
  }, [api]);

  const addNewTag = (_tagName: string) => {
    const _updatedCategory = { ...selectedCategory, values: [...selectedCategory.values, { id: _tagName, slug: '' }] };

    siteTags.forEach(cat => {
      if (cat.id === selectedCategory.id) cat.values = _updatedCategory.values;
    });

    api.tagging.save({ tags: siteTags, domainId: domain._id }).then(() => requery());
  };
  const addNewCategory = (_categoryName: string) => {
    siteTags.push({ id: _categoryName, slug: '', values: [] });
    api.tagging.save({ tags: siteTags, domainId: domain._id }).then(() => requery(_categoryName));
  };
  const requery = (_categoryName?: string) => {
    api.tagging.fetch(domain._id).then(result => {
      setSiteTags(result);
      setCategoryName('');
      setShowNewCategory(false);
      if (_categoryName) setSelectedCategory(result.find(r => r.id === _categoryName));
    });
  };

  return (
    <form name={name}>
      <div className="hentley-settings-form">
        <div className="hentley-settings-form__left">
          <div className="hentley-settings-form-section">
            <div className="hentley-settings-form__title">Category</div>
            {siteTags.map(category => {
              return (
                <div
                  key={category}
                  className={`hentley-settings-form__title ${selectedCategory.id === category.id ? 'underline' : ''}`}
                  onClick={() => setSelectedCategory(category)}>
                  {category.id}
                </div>
              );
            })}
            {selectedCategory && selectedCategory.id && selectedCategory.values.length ? (
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
                    action: (_item: any) => {},
                  },
                ]}
              />
            ) : (
              <div> No Tags for this category</div>
            )}
          </div>
        </div>
        <div className="hentley-settings-form__right">
          <div className="hentley-settings-form--flex-end">
            <WhpptButton
              text="Add new category"
              onClick={() => {
                setShowNewTag(false);
                setShowNewCategory(true);
              }}
            />
            {selectedCategory && selectedCategory.id ? (
              <WhpptButton
                text={`Add new tag to ${selectedCategory.id}`}
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
            <div className="hentley-settings-form-section">
              <div className="hentley-settings-form__title">Add a new category?</div>
              <div className="hentley-settings-form__note">
                We found a contact in the system that shares this email account and can become a staff member.
              </div>

              <WhpptInput id="category-input" label="Category Name" type="text" value={categoryName} onChange={setCategoryName} />

              <WhpptButton text="Save" onClick={() => addNewCategory(categoryName)} />
            </div>
          ) : (
            <></>
          )}
          {showNewTag ? (
            <div className="hentley-settings-form-section">
              <div className="hentley-settings-form__title">`Add new tag to ${selectedCategory.id}`</div>
              <div className="hentley-settings-form__note">
                We found a contact in the system that shares this email account and can become a staff member.
              </div>

              <WhpptInput id="tag-input" label="New Tag Name" type="text" value={tagName} onChange={setTagName} />

              <WhpptButton text="Save" onClick={() => addNewTag(tagName)} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* <section className="whppt-form-page-settings__actions">
        <h2>Website Tags</h2>
      </section> */}
      {/* <section className="whppt-form-section whppt-form-page-settings__form whppt-form-section--bottom-gap">
        <div>
          <h3>Categories</h3>
          <WhpptTabs tabs={tabs} selectedTab={activeTab} selectTab={newTab => setActiveTab(newTab.name)} />
          <WhpptInput id="category-input" label="Category Name" type="text" value={categoryName} onChange={setCategoryName} />
          <WhpptButton icon="" text="Save new category" onClick={() => null} />
          <WhpptInput id="tag-input" label="New Tag Name" type="text" value={tagName} onChange={setTagName} />
          <WhpptButton icon="" text="Add new tag" onClick={() => onSave(tagName, activeTab)} />
          <WhpptTable
            headers={headers}
            perPage={10}
            dense={false}
            hideHeaders={false}
            hideFooters={false}
            items={[]}
            height={''}
            fixedHeader={false}
            page={1}
            total={0}
            setCurrentPage={function (page: any): void {
              throw new Error('Function not implemented.');
            }}
            setPerPage={() => 10}
            actions={[
              {
                icon: 'unpublish',
                info: 'Remove Tag',
                action: (_item: any) => {},
              },
            ]}
          />
        </div>
      </section> */}
    </form>
  );
};
