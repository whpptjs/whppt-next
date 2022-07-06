import React, { FC, useState } from 'react';
import { Domain } from '../../Model';
import { useWhppt } from '../../../Context';
import { WhpptTable } from '../../../ui/components';
import { WhpptEditDomain } from './WhpptEditDomain';

export const DomainsList: FC<{ domains: Domain[]; requery: () => void }> = ({
  domains,
  requery,
}) => {
  const headers = [
    { text: 'Name', align: 'start', value: 'name' },
    { text: 'Hosts', align: 'start', value: 'hostNameValue' },
  ] as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [editDomain, setEditDomain] = useState({} as Domain);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const { api } = useWhppt();

  const closeEdit = () => {
    setEditDomain({} as Domain);
    requery();
  };
  return (
    <section className="whppt-form-section">
      {editDomain && editDomain._id ? (
        <WhpptEditDomain domain={editDomain} callback={closeEdit} />
      ) : (
        <WhpptTable
          dense={true}
          items={domains}
          total={domains.length}
          headers={headers}
          hideFooters={false}
          hideHeaders={false}
          page={currentPage}
          perPage={5}
          height={''}
          fixedHeader={false}
          setCurrentPage={handlePageChange}
          actions={[
            {
              icon: 'edit',
              info: 'Edit Domain',
              action: (item: Domain) => {
                setEditDomain(item);
              },
            },
            {
              icon: 'publish',
              info: 'Publish Domain',
              show: (item: Domain) => item.published,
              action: (item: Domain) => {
                api.app.domain.unPublish(item).then(() => requery());
              },
            },
            {
              icon: 'unpublish',
              info: 'Unpublish Domain',
              show: (item: Domain) => !item.published,
              action: (item: Domain) => {
                api.app.domain.publish(item).then(() => requery());
              },
            },
          ]}
        />
      )}
    </section>
  );
};
