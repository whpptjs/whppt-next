import React, { FC, useState, useEffect } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptIcon, WhpptTab } from '../../ui/components';
import { WhpptTable } from '../../ui/components/Table';
import { WhpptButton } from '../../ui/components/Button';
import { useWhppt } from '../../Context';

export const Redirects: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Actions', value: 'actions' },
    { text: 'Name', value: 'left' },
    { text: 'From', value: 'from' },
    { text: 'To', value: 'to' },
    { text: 'Published', value: 'published' },
    { text: 'Published At', value: 'publishedAt' },
  ] as any;

  const { api, domain } = useWhppt();

  const [errorState, setError] = useState<Error>();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchRedirects, setSearchRedirects] = useState('');

  const [isAddingRedirect, setIsAddingRedirect] = useState(false);

  const [newRedirectName, setNewRedirectName] = useState('');
  const [newFromDomain, setNewFromDomain] = useState('');
  const [newToDomain, setNewToDomain] = useState('');

  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    requery();
  }, [searchRedirects, currentPage, perPage]);

  const requery = () => {
    api.site.redirect
      .load({
        page: currentPage,
        size: perPage,
        domainId: domain._id,
        search: searchRedirects,
      })
      .then(({ redirects, total }) => {
        Array.isArray(redirects) && setItems(redirects);
        total && setTotal(total);
      })
      .catch(err => setError(err));
  };

  const addRedirect = () => {
    const newRedirect = {
      name: newRedirectName,
      to: newToDomain,
      from: newFromDomain,
      domainId: domain._id,
    };

    api.site.redirect
      .save(newRedirect)
      .then(redirect => {
        requery();
        redirect && resetInputs();
      })
      .catch(err => setError(err));
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const resetInputs = () => {
    setNewRedirectName('');
    setNewFromDomain('');
    setNewToDomain('');
  };

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <div className="whppt-site-settings__new-redirect-input" onClick={() => setIsAddingRedirect(!isAddingRedirect)}>
          <p>Add New Redirect</p>
          <button type="button">
            <div className={`whppt-site-settings__new-redirect-icon ${isAddingRedirect ? 'up' : 'down'}`}>
              <WhpptIcon is="down" />
            </div>
          </button>
        </div>
        <hr />

        {isAddingRedirect && (
          <div className="transition-height duration-500 ease-in-out">
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
            <div className="whppt-section__domain-inputs">
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

            <WhpptButton icon="" text="Add Redirect" onClick={addRedirect} disabled={!newRedirectName || !newFromDomain || !newToDomain} />
          </div>
        )}
      </section>

      <section className="whppt-form-section">
        <WhpptInput
          id={'Redirect filter'}
          placeholder={'about-us'}
          label={'Search'}
          value={searchRedirects}
          onChange={setSearchRedirects}
          info={'Search the from field or the to field'}
          error={errorState && errorState.message}
          type="text"
        />

        <WhpptTable
          dense={true}
          items={items}
          total={total}
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
