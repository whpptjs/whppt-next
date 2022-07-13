import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';

export const PageSeo = ({ name, label }) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description, priority, frequency) => {
    const settings = { ...pageSettingsData, seo: { title, keywords, description, priority, frequency }};
    const updatedPage = {...page, settings: {...settings}};

    return api.page
      .create({ page: { ...updatedPage }})
      .then(() => {
        setPageSettingsData(settings);
      });
  }

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
