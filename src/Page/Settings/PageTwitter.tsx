import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';

export const PageTwitter = ({ name, label }) => {
  const {  pageSettings, setPageSettings } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...pageSettings.settings, twitter: { title, keywords, description }}
    setPageSettings({ ...pageSettings, ...settings });
  }

  return <Twitter name={name} label={label} save={save}/>
}
