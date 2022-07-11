import React from 'react';
import { useWhppt } from '../../../Context';
import { OpenGraph } from '../../../CommonSettings/OpenGraph'

export const PageOpenGraph = ({ name, label }) => {
  const { siteSettings, setSiteSettings } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...siteSettings.settings, og: { title, keywords, description }}
    setSiteSettings({ ...siteSettings,  settings });
  }

  return <OpenGraph name={name} label={label} save={save}/>
}
