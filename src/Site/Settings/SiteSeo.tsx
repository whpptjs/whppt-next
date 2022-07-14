import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';
import { WhpptTab } from '../../ui/components/WhpptTab';

export const SiteSeo = ({ name, label }: WhpptTab) => {
  const { api, domain, settingsData, setSettingsData } = useWhppt();

  const save = (title, keywords, description, priority, frequency) => {
    const settings = { ...settingsData, seo: { title, keywords, description, priority, frequency } };

    return api.site.settings.save({ settings, domain }).then(() => {
      setSettingsData(settings);
    });
  };

  return (
    <Seo
      name={name}
      label={label}
      save={save}
      title={settingsData.seo && settingsData.seo.title}
      keywords={settingsData.seo && settingsData.seo.keywords}
      description={settingsData.seo && settingsData.seo.description}
      priority={settingsData.seo && settingsData.seo.priority}
      frequency={settingsData.seo && settingsData.seo.frequency}
    />
  );
};
