import React, { FC, useState, useEffect } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptIcon, WhpptTab } from '../../ui/components';
import { WhpptTable } from '../../ui/components/Table';
import { WhpptButton } from '../../ui/components/Button';

export const Redirects: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Actions', align: 'start', value: 'actions' },
    { text: 'Name', align: 'start', value: 'name' },
    { text: 'From', align: 'start', value: 'from' },
    { text: 'To', align: 'start', value: 'to' },
    { text: 'Published', align: 'start', value: 'published' },
    { text: 'Published At', align: 'start', value: 'publishedAt' },
    { text: 'Last Modified', align: 'start', value: 'lastmod' },
    { text: 'Created At', align: 'start', value: 'createdAt' },
  ] as any;

  const [searchRedirects, setSearchRedirects] = useState('');
  const [items, setItems] = useState([]);

  const [isAddingRedirect, setIsAddingRedirect] = useState(false);
  const [newRedirectName, setNewRedirectName] = useState('');
  const [newFromDomain, setNewFromDomain] = useState('');
  const [newToDomain, setNewToDomain] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //TODO: update items after fetch

    //Then set the items witth the result
    setItems([
      {
        _id: 1,
        domainId: 'testDomain',
        name: 'testName.testName.testName.com',
        from: 'testFrom.testFrom.testFrom.com',
        to: 'testTo',
        lastmod: '01-01-2022',
        createdAt: '01-01-2022',
        published: '01-01-2022',
        publishedAt: '01-01-2022',
      },
      {
        _id: 1,
        domainId: 'testDomain',
        name: 'testName.testName.testName.com',
        from: 'testFrom.testFrom.testFrom.com',
        to: 'testTo',
        lastmod: '01-01-2022',
        createdAt: '01-01-2022',
        published: '01-01-2022',
        publishedAt: '01-01-2022',
      },
    ]);
  }, [searchRedirects]);

  const addRedirect = () => {};

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <form className='whppt-form whppt-site-settings'>
      <section className='whppt-form-section whppt-form-section--bottom-gap'>
        <div className='whppt-site-settings__new-redirect-input' onClick={() => setIsAddingRedirect(!isAddingRedirect)}>
          <p>Add New Redirect</p>
          <button type='button'>
            <div className={`whppt-site-settings__new-redirect-icon ${isAddingRedirect ? 'up' : 'down'}`}>
              <WhpptIcon is='down'/>
            </div>
          </button>
        </div>
        <hr/>

        {isAddingRedirect &&
          <div className='transition-height duration-500 ease-in-out'>
            <WhpptInput
              id={'setting-redirects-name'}
              placeholder={''}
              label={'Name'}
              value={newRedirectName}
              onChange={setNewRedirectName}
              info={''}
              error={''}
              type="text"
            />
            <div className='whppt-section__domain-inputs'>
              <WhpptInput
                id={'setting-redirects-from'}
                placeholder={'From page'}
                label={'From'}
                value={newFromDomain}
                onChange={setNewFromDomain}
                info={'Example: /my-page. When visiting this page, users will be sent to the To URL instead.'}
                error={''}
                type="text"
              />
              <WhpptInput
                id={'settings-redirects-to'}
                placeholder={'To URL'}
                label={'To'}
                value={newToDomain}
                onChange={setNewToDomain}
                info={'Example: /another-page or https://www.whppt.org. Users will be sent to this URL when visiting the From Page.'}
                error={''}
                type="text"
              />
            </div>

            <WhpptButton
              icon=''
              text='Add Redirect'
              onClick={addRedirect}
              disabled={!newRedirectName || !newFromDomain || !newToDomain}
            />
          </div>
        }
      </section>

      <section className='whppt-form-section'>
        <WhpptInput
          id={'Redirect filter'}
          placeholder={'about-us'}
          label={'Search'}
          value={''}
          onChange={setSearchRedirects}
          info={'Search the from field or the to field'}
          error={''}
          type="text"
        />

        <WhpptTable
          dense={true}
          items={items}
          total={10}
          headers={headers}
          hideFooters={false}
          hideHeaders={false}
          page={currentPage}
          perPage={perPage}
          height={''}
          fixedHeader={false}
          setCurrentPage={handlePageChange}
          setPerPage={setPerPage}
        />
      </section>
    </form>
  );
};
