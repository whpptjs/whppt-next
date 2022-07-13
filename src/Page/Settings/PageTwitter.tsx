import React from 'react';
import { Twitter } from '../../CommonSettings/Twitter';
import { useWhppt } from '../../Context';

export const PageTwitter = ({ name, label }) => {
  const { api, page, pageSettingsData, setPageSettingsData } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...pageSettingsData, twitter: { title, keywords, description }};
    const updatedPage = {...page, settings: {...settings}};

    api.page
      .create({ page: { ...updatedPage }});

    setPageSettingsData(settings);
  }

  return <Twitter name={name} label={label} save={save} loadedTwitterData={pageSettingsData && pageSettingsData.twitter} />
}