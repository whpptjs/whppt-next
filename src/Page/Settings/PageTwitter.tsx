import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';
import { WhpptTab } from '../../ui/components/WhpptTab';

export const PageTwitter = ({ name, label }: WhpptTab) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...pageSettingsData, twitter: { title, keywords, description } };
    const updatedPage = { ...page, settings: { ...settings } };

    api.page
      .create({ page: { ...updatedPage } })
      .then(() => {
        setPageSettingsData(settings);
      })
      .catch(() => {
        console.log('ERROR!');
      });
  };

  return (
    <Twitter
      name={name}
      label={label}
      save={save}
      title={pageSettingsData.twitter && pageSettingsData.twitter.title}
      keywords={pageSettingsData.twitter && pageSettingsData.twitter.keywords}
      description={pageSettingsData.twitter && pageSettingsData.twitter.description}
    />
  );
};
