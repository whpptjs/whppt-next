import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';
import { WhpptTab } from '../../ui/components/WhpptTab';

export const PageSeo = ({ name, label }: WhpptTab) => {
  const { api, page, setPage } = useWhppt();

  const save = (title, keywords, description, priority, frequency) => {
    const settings = { ...page.settings, seo: { title, keywords, description, priority, frequency } };
    const updatedPage = { ...page, settings: { ...settings } };

    return api.page.save({ page: updatedPage }).then(() => {
      setPage(updatedPage);
    });
  };

  return (
    <Seo
      name={name}
      label={label}
      save={save}
      title={page.settings.seo && page.settings.seo.title}
      keywords={page.settings.seo && page.settings.seo.keywords}
      description={page.settings.seo && page.settings.seo.description}
      priority={page.settings.seo && page.settings.seo.priority}
      frequency={page.settings.seo && page.settings.seo.frequency}
    />
  );
};
