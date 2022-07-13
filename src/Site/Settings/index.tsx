import React, { FC } from "react";
import { useWhppt } from "../../Context";
import { WhpptTabs, WhpptTab } from "../../ui/components";

import { Seo } from "../../CommonSettings/Seo";
import { OpenGraph } from "../../CommonSettings/OpenGraph";
import { General } from "./General";
import { Twitter } from "../../CommonSettings/Twitter";
import { Redirects } from "./Redirects";
import { Files } from "./Files";
import { Banner } from "./Banner";

export type WhpptSelectedType = string;

export const SiteSettings: FC = () => {
  const { siteSettings, changeSiteSettingsActiveTab } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: "general", label: "General" },
    { name: "s-e-o", label: "Seo" },
    { name: "open-graph", label: "Open Graph" },
    { name: "twitter", label: "Twitter" },
    { name: "redirects", label: "Redirects" },
    { name: "files", label: "Files" },
    { name: "banner", label: "Banner" }
  ];

  return (
    <>
      <WhpptTabs
        tabs={tabs}
        selectTab={changeSiteSettingsActiveTab}
        selectedTab={siteSettings.activeTab}
      />
      <WhpptTab selectedTab={siteSettings.activeTab}>
        <General name="general" label="General" />
        <Seo name="s-e-o" label="Seo" />
        <OpenGraph name="open-graph" label="Open Graph" />
        <Twitter name="twitter" label="Twitter" />
        <Redirects name="redirects" label="Redirects" />
        <Files name="files" label="Files" />
        <Banner name="banner" label="Banner" />
      </WhpptTab>
    </>
  );
};
