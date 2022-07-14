import React, { FC, useState } from 'react';
import { WhpptTab, WhpptTableHeader } from '../ui/components';
import { WhpptTable } from '../ui/components';

export const Sitemap: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Slug', align: 'start', value: 'slug' },
    { text: 'Page type', align: 'start', value: 'page-type' },
    { text: 'Last modified', align: 'start', value: 'last-modified' },
    { text: 'Last published', align: 'start', value: 'last-published' },
    { text: 'Currently published', align: 'start', value: 'currently-published' },
    { text: 'Published by you', align: 'start', value: 'published-by-you' },
    { text: 'Change frequency', align: 'start', value: 'change-frequency' },
    { text: 'Priority', align: 'start', value: 'priority' },
  ] as WhpptTableHeader[];

  const [perPage, setPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <form className="whppt-form">
      <WhpptTable
        headers={headers}
        perPage={perPage}
        dense={true}
        hideHeaders={false}
        hideFooters={false}
        items={items}
        height={''}
        fixedHeader={false}
        page={currentPage}
        total={total}
        setCurrentPage={handlePageChange}
      />
    </form>
  );
};
