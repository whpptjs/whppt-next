import React, { FC } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTab } from '../../ui/components';
import { WhpptTable } from '../../ui/components/Table';

export const Redirects: FC<WhpptTab> = () => {

  const items = [
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
    }
  ] as any;

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

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        Add New Redirect TODO: Dropdown
        <hr/>
      </section>

      <section className="whppt-form-section">
        <WhpptInput
          id={"Redirect filter"}
          placeholder={"about-us"}
          label={"Search"}
          value={""}
          onChange={(e) => (console.log('from Redirects page', e))}
          info={"Search the from field or the to field"}
          error={""}
          type="text"
        />

        <WhpptTable
          dark={true}
          hideFooters={false}
          items={items}
          headers={headers}
          hideHeaders={false}
          page={1}
          perPage={5}
          total={1}
          dense={true}
          height={''}
          fixedHeader={false}
        />
      </section>
    </form>
  );
};
