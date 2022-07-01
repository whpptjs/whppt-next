import React, { FC } from "react";
import { useWhppt } from "../Context";
import { PageSettings } from "../Page/Settings";

export const SettingsPanel: FC<{ showFullNav: boolean }> = ({
  showFullNav,
}) => {
  const { pageSettings } = useWhppt();

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? "whppt-popup--fullNav" : ""}
      ${pageSettings.visible ? "whppt-popup--active" : ""}`}
    >
      <div className="whppt-popup__contents">
        {pageSettings.visible ? <PageSettings /> : <></>}
      </div>
    </div>
  );
};
