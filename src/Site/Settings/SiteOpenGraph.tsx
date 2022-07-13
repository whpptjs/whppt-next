import React from 'react';
import { useWhppt } from '../../Context';
import { OpenGraph } from '../../CommonSettings/OpenGraph'

export const SiteOpenGraph = ({ name, label }) => {
  const { api, domain, settingsData, setSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...settingsData, og: { title, keywords, description} }

    return api.site.settings
      .save({ settings, domain })
      .then(() => {
        setSettingsData(settings);
      });
  }

  return (
    <OpenGraph
      name={name}
      label={label}
      save={save}
      title={settingsData.og && settingsData.og.title}
      keywords={settingsData.og && settingsData.og.keywords}
      description={settingsData.og && settingsData.og.description}
    />
  );
};
