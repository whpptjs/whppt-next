import React, { FC, useState } from 'react';
import { WhpptTab, WhpptTableHeader } from '../ui/components';
import { WhpptTable } from '../ui/components';

export const FormSubmissions: FC<WhpptTab> = () => {
  const headers = [
    { text: 'From identifier', align: 'start', value: 'form-identifier' },
    { text: 'Email subject', align: 'start', value: 'email-subject' },
    { text: 'Email recipient', align: 'start', value: 'email-recipient' },
    { text: 'Email ccs', align: 'start', value: 'email-ccs' },
    { text: 'Submitted at', align: 'start', value: 'submitted-at' },
    { text: '', align: 'start', value: '' },
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
