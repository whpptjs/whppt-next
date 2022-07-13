import React from 'react';
import { useWhppt } from '../../Context';
import { OpenGraph } from '../../CommonSettings/OpenGraph';

export const PageOpenGraph = ({ name, label }) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...pageSettingsData, og: { title, keywords, description }};
    const updatedPage = {...page, settings: {...settings}};

    return api.page
      .create({ page: { ...updatedPage }})
      .then(() => {
        setPageSettingsData(settings);
      });
  }

  return (
    <OpenGraph
      name={name}
      label={label}
      save={save}
      title={pageSettingsData.og && pageSettingsData.og.title}
      keywords={pageSettingsData.og && pageSettingsData.og.keywords}
      description={pageSettingsData.og && pageSettingsData.og.description}
    />
  )
}
