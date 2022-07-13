import React, { FC, useEffect } from "react";
import { useWhppt } from "../../Context";
import { WhpptTabs, WhpptTab } from "../../ui/components";

import { General } from "./General";
import { SiteOpenGraph } from "./SiteOpenGraph";
import { SiteSeo } from "./SiteSeo";
import { SiteTwitter } from "./SiteTwitter";
import { Redirects } from "./Redirects";
import { Files } from "./Files";
//import { Banner } from "./Banner";

export type WhpptSelectedType = string;

export const SiteSettings: FC = () => {
  const { api, domain, siteSettings, changeSiteSettingsActiveTab, setSettingsData } = useWhppt();

  const tabs: Array<WhpptTab> = [
    { name: "general", label: "General" },
    { name: "s-e-o", label: "Seo" },
    { name: "open-graph", label: "Open Graph" },
    { name: "twitter", label: "Twitter" },
    { name: "redirects", label: "Redirects" },
    { name: "files", label: "Files" },
    // { name: "banner", label: "Banner" }
  ];

  useEffect(() => {
    api.site.settings
      .load({domain})
      .then((settings) => {
        setSettingsData(settings);
      });
  }, []);

  return (
    <div>
      <WhpptTabs
        tabs={tabs}
        selectTab={changeSiteSettingsActiveTab}
        selectedTab={siteSettings.activeTab}
      />
      <WhpptTab selectedTab={siteSettings.activeTab}>
        <General name="general" label="General" />
        <SiteSeo name="s-e-o" label="Seo" />
        <SiteOpenGraph name="open-graph" label="Open Graph" />
        <SiteTwitter name="twitter" label="Twitter" />
        <Redirects name="redirects" label="Redirects" />
        <Files name="files" label="Files" />
        {/* <Banner name="banner" label="Banner" /> */}
      </WhpptTab>
    </div>
  );
};
