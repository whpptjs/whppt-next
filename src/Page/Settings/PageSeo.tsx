import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';
import { WhpptTab } from '../../ui/components/WhpptTab';

export const PageSeo = ({ name, label }: WhpptTab) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description, priority, frequency) => {
    const settings = { ...pageSettingsData, seo: { title, keywords, description, priority, frequency } };
    const updatedPage = { ...page, settings: { ...settings } };

    api.page
      .save({ page: { ...updatedPage } })
      .then(() => {
        setPageSettingsData(settings);
      })
      .catch(() => {
        console.log('ERROR!');
      });
  };

  return (
    <Seo
      name={name}
      label={label}
      save={save}
      title={pageSettingsData.seo && pageSettingsData.seo.title}
      keywords={pageSettingsData.seo && pageSettingsData.seo.keywords}
      description={pageSettingsData.seo && pageSettingsData.seo.description}
      priority={pageSettingsData.seo && pageSettingsData.seo.priority}
      frequency={pageSettingsData.seo && pageSettingsData.seo.frequency}
    />
  );
};
