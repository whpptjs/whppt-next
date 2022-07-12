import React from 'react';
import { useWhppt } from '../../Context';
import { OpenGraph } from '../../CommonSettings/OpenGraph';

export const PageOpenGraph = ({ name, label }) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...pageSettingsData, og: { title, keywords, description }}
    const updatedPage = {...page, settings: {...settings}};

    api.page
      .create({ page: { ...updatedPage }});

    setPageSettingsData(settings);
  }

  return <OpenGraph name={name} label={label} save={save} loadedOgData={pageSettingsData && pageSettingsData.og} />
}
