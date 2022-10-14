import React, { FC } from 'react';
import { SiteMapTable } from './SiteMap';

export type WhpptSelectedType = string;

export const SiteMap: FC = () => {
  return (
    <div>
      <div className="whppt-popup__tab whppt-popup__tab--active ">Site Map</div>
      <SiteMapTable />
    </div>
  );
};
