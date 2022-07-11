import React from 'react';
import { useWhppt } from '../../Context';
import { Seo } from '../../CommonSettings/Seo';

export const SettingsSeo = ({ name, label}) => {
  const { siteSettings, setSiteSettings } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...siteSettings.settings, seo: { title, keywords, description }}
    setSiteSettings({ ...siteSettings,  settings });
  }

  return <Seo name={name} label={label} save={save}/>
};
