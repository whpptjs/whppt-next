import React, { FC } from "react";
import { useWhppt } from "../../Context";
import { WhpptTabs, WhpptTab } from "../../ui/components";

import { Seo } from "./Seo";
import { OpenGraph } from "./OpenGraph";
import { General } from "./General";
import { Twitter } from "./Twitter";

export type WhpptSelectedType = string;

export const PageSettings: FC = () => {
  const { pageSettings, changePageSettingsActiveTab } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: "general", label: "General" },
    { name: "s-e-o", label: "Seo" },
    { name: "open-graph", label: "Open Graph" },
    { name: "twitter", label: "Twitter" },
  ];

  return (
    <div>
      <WhpptTabs
        tabs={tabs}
        selectTab={changePageSettingsActiveTab}
        selectedTab={pageSettings.activeTab}
      />
      <WhpptTab selectedTab={pageSettings.activeTab}>
        <General name="general" label="General" />
        <Seo name="s-e-o" label="Seo" />
        <OpenGraph name="open-graph" label="Open Graph" />
        <Twitter name="twitter" label="Twitter" />
      </WhpptTab>
    </div>
  );
};
