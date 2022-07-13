import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';

export const SiteTwitter = ({ name, label}) => {
  const { api, domain, settingsData, setSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...settingsData, twitter: { title, keywords, description} }

    return api.site.settings
      .save({ settings, domain })
      .then(() => {
        setSettingsData(settings);
      });
  }

  return (
    <Twitter
      name={name}
      label={label}
      save={save}
      title={settingsData.twitter && settingsData.twitter.title}
      keywords={settingsData.twitter && settingsData.twitter.keywords}
      description={settingsData.twitter && settingsData.twitter.description}
     />
  );};
