import React, { FC } from "react";
import { WhpptLinkData, WhpptTab } from "../../ui/components";
import { EditorArgs } from "../EditorArgs";

export const FileLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = (
  {
    // options,
    // value,
    // onChange,
  }
) => {
  return (
    <form className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        {/* TODO: Implement file selection on links */}
        Comming Soon ...
        {/* <WhpptInput
          id="whppt-editor-link-text"
          label="Text to show in the link"
          type="text"
          error={options.error}
          info={options.info}
          value={value.text}
          onChange={(text) => onChange({ ...value, text })}
        />

        <WhpptInput
          id="whppt-editor-link-href"
          label="Anchor on the page to link to"
          type="text"
          error={options.error}
          info="eg. #anchor"
          value={value.text}
          onChange={(text) => onChange({ ...value, text })}
        /> */}
      </section>
    </form>
  );
};
