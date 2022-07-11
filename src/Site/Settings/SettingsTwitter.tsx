import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';

export const SettingsTwitter = ({ name, label}) => {
  const { siteSettings, setSiteSettings } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...siteSettings.settings, twitter: { title, keywords, description }}
    setSiteSettings({ ...siteSettings,  settings });
  }

  return <Twitter name={name} label={label} save={save}/>
};
