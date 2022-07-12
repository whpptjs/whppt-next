import React, { FC } from "react";
import { WhpptLinkData, WhpptTab, WhpptTabs } from "../../ui/components";
import { EditorArgs } from "../EditorArgs";
import { ExternalLinkTab } from "./External";
import { PageLinkTab } from "./Page";

export const WhpptLinkEditor: FC<EditorArgs<WhpptLinkData>> = ({
  value,
  onChange,
  options,
}) => {
  const tabs: Array<WhpptTab> = [
    { name: "page", label: "Page" },
    { name: "external", label: "External" },
    { name: "anchor", label: "Anchor" },
    { name: "file", label: "File" },
  ];

  return (
    <div className="whppt-plaintext-editor">
      <WhpptTabs
        tabs={tabs}
        selectedTab={value.type}
        selectTab={(type) => {
          onChange({ ...value, type });
        }}
      />
      <WhpptTab selectedTab={value.type}>
        <PageLinkTab
          name="general"
          label="General"
          value={value}
          onChange={onChange}
          options={options}
        ></PageLinkTab>
        <ExternalLinkTab
          name="external"
          label="External"
          value={value}
          onChange={onChange}
          options={options}
        ></ExternalLinkTab>
      </WhpptTab>
    </div>
  );
};
