import React, { useEffect, useState } from 'react';
import { useWhppt } from '../../../Context';
import { Seo } from '../../../CommonSettings/Seo';

export const PageSeo = ({ name, label }) => {
  const { api, domain, siteSettings, setSiteSettings } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = {
      ...siteSettings.settings,
      seo: { title, keywords, description },
      _id: `siteSettings_${domain._id}`
    };

    api.site.settings
      .save({ ...siteSettings, settings, domain});

    setSiteSettings({ ...siteSettings, settings });
  }

  return <Seo name={name} label={label} save={save} />
}
