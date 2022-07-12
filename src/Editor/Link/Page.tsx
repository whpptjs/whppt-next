import React, { FC } from "react";
import { WhpptInput, WhpptLinkData, WhpptTab } from "../../ui/components";
import { EditorArgs } from "../EditorArgs";

export const PageLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <form className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id="whppt-plaintext-input"
          label="Text to show in the link"
          type="text"
          error={options.error}
          info={options.info}
          value={value.text}
          onChange={(text) => onChange({ ...value, text })}
        />

        <WhpptInput
          id="whppt-plaintext-input"
          label="Page to link to"
          type="text"
          error={options.error}
          info={options.info}
          value={value.href}
          onChange={(href) => onChange({ ...value, href })}
        />
      </section>
    </form>
  );
};
