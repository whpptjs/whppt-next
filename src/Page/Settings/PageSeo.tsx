import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';

export const PageSeo = ({ name, label }) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description, priority, frequency) => {
    const settings = { ...pageSettingsData, seo: { title, keywords, description, priority, frequency }};
    const updatedPage = {...page, settings: {...settings}};

    api.page
      .create({ page: { ...updatedPage }});

    setPageSettingsData(settings);
  }

  return <Seo name={name} label={label} save={save} loadedSeoData={pageSettingsData && pageSettingsData.seo} />
};
