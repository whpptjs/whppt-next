import React, { FC, useState, useCallback } from "react";
import { useWhppt } from "../Context";
import { WhpptTabs } from "./WhpptTabs";
import { WhpptTab } from "./WhpptTab";

import { Seo } from "./forms/pageSettings/Seo";
import { OpenGraph } from "./forms/pageSettings/OpenGraph";
import { General } from "./forms/pageSettings/General";
import { Twitter } from "./forms/pageSettings/Twitter";

export type WhpptTab = {
  name: string;
  label: string;
};

export type WhpptSelectedType = string;

export const WhpptFullScreenPopup: FC<{ showFullNav: boolean }> = ({
  showFullNav,
}) => {
  const { pageSettings } = useWhppt();
  const [selectedTab, setSelectedTab] = useState("general");

  const selectTab = useCallback((pageName) => {
    setSelectedTab(pageName);
  }, []);

  const tabs: Array<WhpptTab> = [
    { name: "general", label: "General" },
    { name: "s-e-o", label: "Seo" },
    { name: "open-graph", label: "Open Graph" },
    { name: "twitter", label: "Twitter" },
  ];

  return (
    <div
      className={`whppt-popup
      ${showFullNav ? "whppt-popup--fullNav" : ""}
      ${pageSettings.visible ? "whppt-popup--active" : ""}`}
    >
      <div className="whppt-popup__contents">
        <WhpptTabs
          tabs={tabs}
          selectTab={selectTab}
          selectedTab={selectedTab}
        />
        <WhpptTab selectedTab={selectedTab}>
          <General name="general" label="General" />
          <Seo name="s-e-o" label="Seo" />
          <OpenGraph name="open-graph" label="Open Graph" />
          <Twitter name="twitter" label="Twitter" />
        </WhpptTab>
      </div>
    </div>
  );
};
