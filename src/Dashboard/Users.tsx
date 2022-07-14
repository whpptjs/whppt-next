import React, { FC, useState } from 'react';
import { WhpptTab, WhpptTableHeader } from '../ui/components';
import { WhpptTable } from '../ui/components';

export const Users: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Username', align: 'start', value: 'username' },
    { text: 'Email', align: 'start', value: 'email' },
    { text: 'Verified', align: 'start', value: 'verified' },
    // { text: 'Roles', align: 'start', value: 'roles' },
    { text: 'Created at', align: 'start', value: 'ceated-at' },
    { text: 'Updated at', align: 'start', value: 'updated-at' },
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
