import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';

export const SiteTwitter = ({ name, label}) => {
  const { api, domain, settingsData, setSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...settingsData, twitter: { title, keywords, description} }

    api.site.settings
      .save({settings, domain});

    setSettingsData(settings);
  }

  return <Twitter name={name} label={label} save={save} loadedTwitterData={settingsData && settingsData.twitter}/>
};
