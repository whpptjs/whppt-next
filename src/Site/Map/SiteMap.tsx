import React, { FC, useCallback, useEffect, useState } from 'react';
import { useWhppt } from '../../Context';
// import { WhpptHeading } from '../../ui/components/Heading';
import { WhpptInput, WhpptTab, WhpptTable } from '../../ui/components';
// import { WhpptButton, WhpptTab } from '../../ui/components';
// import { useWhppt } from '../../Context';
// import { toast } from 'react-toastify';

export const SiteMapTable: FC<WhpptTab> = () => {
  const { api, domain } = useWhppt();
  // const { api, settingsData, nav, footer } = useWhppt();
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [errorState, setError] = useState();
  const [created, setCreated] = useState(false);
  const headers = [
    { text: 'Slug', value: 'slug' },
    { text: 'Last Published', value: 'lastPublished' },
    { text: 'Published', value: 'published' },
    { text: 'Updated At', value: 'updatedAt' },
  ];
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const requery = useCallback(() => {
    api.site.sitemap
      .load({ page: currentPage, size: perPage, domain, slug: filter })
      .then(({ sitemap, total }) => {
        Array.isArray(sitemap) && setItems(sitemap);
        total && setTotal(total);
      })
      .catch(err => setError(err));
  }, [api.site.sitemap, currentPage, perPage, domain, filter]);

  useEffect(() => {
    if (!created) return setCreated(true);
    requery();
  }, [created, filter]);

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section">
        <div>
          <WhpptInput id={'Filter'} label={'Filter List By Slug'} type={'text'} value={filter} onChange={e => setFilter(e)} />
          <WhpptTable
            hideFooters={false}
            items={items}
            headers={headers}
            hideHeaders={false}
            page={currentPage}
            perPage={perPage}
            total={total}
            dense={true}
            height={''}
            fixedHeader={false}
            setCurrentPage={handlePageChange}
            setPerPage={setPerPage}
          />
          <div>{errorState}</div>
        </div>
      </section>
      <div></div>
    </form>
  );
};
