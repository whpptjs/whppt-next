import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';

export const SiteSeo = ({ name, label}) => {
  const { api, domain, settingsData, setSettingsData } = useWhppt();

  const save = (title, keywords, description, priority, frequency) => {
    const settings = { ...settingsData, seo: { title, keywords, description, priority, frequency } }

    api.site.settings
      .save({settings, domain});

    setSettingsData(settings);
  }

  return <Seo name={name} label={label} save={save} loadedSeoData={settingsData && settingsData.seo} />
};
