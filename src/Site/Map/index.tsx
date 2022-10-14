import React, { FC } from 'react';

export type WhpptSelectedType = string;

export const SiteMap: FC = () => {
  return (
    <div>
      <div className="whppt-popup__tabs">
        <div className="whppt-popup__tab">Site Map</div>
      </div>
      <SiteMap />
    </div>
  );
};
