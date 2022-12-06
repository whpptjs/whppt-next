import React, { useEffect, useState } from 'react';
import { WhpptInput, WhpptButton, WhpptTable, WhpptTabs, WhpptTab } from '../../ui/components';
import { useWhppt } from '../../Context';

export const SiteTagging = () => {
  const { api } = useWhppt();
  const [categoryName, setCategoryName] = useState('');
  const [tagName, setTagName] = useState('');
  const [activeTab, setActiveTab] = useState('testCategory');
  const headers = [{ text: 'Name', value: 'name' }] as any;
  const tabs: Array<WhpptTab> = [
    { name: 'testCategory', label: 'Test Category' },
    { name: 'testCategoryTwo', label: 'Another category' },
  ];

  useEffect(() => {
    api.tagging.fetch().then(results => console.log(results));
  }, [api]);

  const onSave = (tagName, activeTab) => {
    console.log(tagName, activeTab);
  };

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <h2>Website Tags</h2>
      </section>
      <section className="whppt-form-section whppt-form-page-settings__form whppt-form-section--bottom-gap">
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
      </section>
    </form>
  );
};
