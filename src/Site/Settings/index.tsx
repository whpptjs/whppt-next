import React, { FC } from "react";
import { useWhppt } from "../../Context";
import { WhpptTabs, WhpptTab } from "../../ui/components";

import { General } from "./General";
import { SettingsOpenGraph } from "./SettingsOpenGraph";
import { SettingsSeo } from "./SettingsSeo";
import { SettingsTwitter } from "./SettingsTwitter";
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
    <div>
      <WhpptTabs
        tabs={tabs}
        selectTab={changeSiteSettingsActiveTab}
        selectedTab={siteSettings.activeTab}
      />
      <WhpptTab selectedTab={siteSettings.activeTab}>
        <General name="general" label="General" />
        <SettingsSeo name="s-e-o" label="Seo" />
        <SettingsOpenGraph name="open-graph" label="Open Graph" />
        <SettingsTwitter name="twitter" label="Twitter" />
        <Redirects name="redirects" label="Redirects" />
        <Files name="files" label="Files" />
        <Banner name="banner" label="Banner" />
      </WhpptTab>
    </div>
  );
};
