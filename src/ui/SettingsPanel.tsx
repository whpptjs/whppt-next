import React, { FC } from "react";
import { useWhppt } from "../Context";
import { PageSettings } from "../Page/Settings/index";
import { SiteSettings } from "../Site/Settings/index";

export const SettingsPanel: FC<{ showFullNav: boolean }> = ({
  showFullNav,
}) => {
  const { pageSettings, siteSettings } = useWhppt();
  const showPanel = [pageSettings, siteSettings].some(setting => setting.visible)

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? "whppt-popup--fullNav" : ""}
      ${showPanel ? "whppt-popup--active" : ""}`}
    >
      <div className="whppt-popup__contents">
        {pageSettings.visible ? <PageSettings /> : <></>}
        {siteSettings.visible ? <SiteSettings /> : <></>}
      </div>
    </div>
  );
};
