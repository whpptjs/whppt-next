import React from 'react';
import { useWhppt } from '../../Context';
import { OpenGraph } from '../../CommonSettings/OpenGraph'

export const SiteOpenGraph = ({ name, label }) => {
  const { api, domain, settingsData, setSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...settingsData, og: { title, keywords, description} }

    api.site.settings
      .save({settings, domain});

    setSettingsData(settings);
  }

  return <OpenGraph name={name} label={label} save={save} loadedOgData={settingsData && settingsData.og}/>
};
