import React, { FC } from "react";
import { useWhppt } from "../../../Context";
import { WhpptTabs, WhpptTab } from "../../../ui/components";

import { General } from "./General";
import { PageOpenGraph } from "./PageOpenGraph";
import { PageSeo } from "./PageSeo";
import { PageTwitter } from "./PageTwitter";

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
        <PageSeo name="s-e-o" label="Seo" />
        <PageOpenGraph name="open-graph" label="Open Graph" />
        <PageTwitter name="twitter" label="Twitter" />
      </WhpptTab>
    </div>
  );
};
