import React, { FC, useState } from 'react';
// import { useWhppt } from '../../../Context';
import { WhpptTable } from '../../../ui/components';
// import { WhpptEditDomain } from './WhpptEditDomain';
import { User } from '../../../Security/Model';

export const UsersList: FC<{ items: User[]; requery: () => void }> = ({ items }) => {
  const headers = [
    { text: 'Username', align: 'left', value: 'username' },
    { text: 'Email', align: 'left', value: 'email' },
  ] as any;

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  // const [editDomain, setEditDomain] = useState({} as Domain);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  // const { api } = useWhppt();

  // const closeEdit = () => {
  //   setEditDomain({} as Domain);
  //   requery();
  // };

  return (
    <section className="whppt-form-section">
      {/* {editDomain && editDomain._id ? (
        <WhpptEditDomain domain={editDomain} callback={closeEdit} />
      ) : ( */}
      <WhpptTable
        dense={true}
        items={items}
        total={items.length}
        headers={headers}
        hideFooters={false}
        hideHeaders={false}
        page={currentPage}
        perPage={perPage}
        height={''}
        fixedHeader={false}
        setCurrentPage={handlePageChange}
        setPerPage={setPerPage}
        actions={
          [
            // {
            //   icon: 'edit',
            //   info: 'Edit Domain',
            //   action: (item: Domain) => {
            //     setEditDomain(item);
            //   },
            // },
            // {
            //   icon: 'publish',
            //   info: 'Publish Domain',
            //   show: (item: Domain) => item.published,
            //   action: (item: Domain) => {
            //     api.app.domain.unPublish(item).then(() => requery());
            //   },
            // },
            // {
            //   icon: 'unpublish',
            //   info: 'Unpublish Domain',
            //   show: (item: Domain) => !item.published,
            //   action: (item: Domain) => {
            //     api.app.domain.publish(item).then(() => requery());
            //   },
            // },
          ]
        }
      />
      {/* )} */}
    </section>
  );
};
