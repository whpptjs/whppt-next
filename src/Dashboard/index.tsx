import React, { FC } from 'react';
import { useWhppt } from '../Context';
import { WhpptTabs, WhpptTab } from '../ui/components';
import { Users } from './Users';
import { Sitemap } from './Sitemap';
import { FormSubmissions } from './FormSubmissions';

export type WhpptSelectedType = string;

export const Dashboard: FC = () => {
  const { dashboard, changeDashboardActiveTab } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: 'users', label: 'Users' },
    { name: 'sitemap', label: 'Sitemap' },
    { name: 'form-submissions', label: 'Form Submissions' },
  ];

  return (
    <>
      <WhpptTabs tabs={tabs} selectTab={changeDashboardActiveTab} selectedTab={dashboard.activeTab} />
      <WhpptTab selectedTab={dashboard.activeTab}>
        <Users name="users" label="Users" />
        <Sitemap name="sitemap" label="Sitemap" />
        <FormSubmissions name="form-submissions" label="Form Submissions" />
      </WhpptTab>
    </>
  );
};
