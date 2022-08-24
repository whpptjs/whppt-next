import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';
import { WhpptTab } from '../../ui/components/WhpptTab';

export const PageTwitter = ({ name, label }: WhpptTab) => {
  const { api, page, setPage } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...page.settings, twitter: { title, keywords, description } };
    const updatedPage = { ...page, settings: { ...settings } };

    return api.page.save({ page: updatedPage }).then(() => {
      setPage(updatedPage);
    });
  };

  return (
    <Twitter
      name={name}
      label={label}
      save={save}
      title={page.settings.twitter && page.settings.twitter.title}
      keywords={page.settings.twitter && page.settings.twitter.keywords}
      description={page.settings.twitter && page.settings.twitter.description}
    />
  );
};
