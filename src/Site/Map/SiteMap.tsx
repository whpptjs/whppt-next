import React, { FC, useCallback, useEffect, useState } from 'react';
import { useWhppt } from '../../Context';
import { WhpptInput, WhpptTable } from '../../ui/components';

export const SiteMapTable: FC = () => {
  const { api, domain } = useWhppt();
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [errorState, setError] = useState();
  const [created, setCreated] = useState(false);
  const headers = [
    { text: 'Slug', value: 'slug', type: 'link' },
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
    // TODO: Fix missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [created, filter, perPage, currentPage]);

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
