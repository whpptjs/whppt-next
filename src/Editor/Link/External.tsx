import React, { FC } from "react";
import { Heading } from "../../ui/components/Heading";
import { WhpptInput, WhpptLinkData, WhpptTab } from "../../ui/components";
import { EditorArgs } from "../EditorArgs";

export const ExternalLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <form className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <Heading text="External Link Settings" />

        <hr className="whppt-site-setings__ruler" />

        <WhpptInput
          id="whppt-plaintext-input"
          label="External url to link to"
          type="text"
          error={options.error}
          info={options.info}
          value={value.text}
          onChange={(text) => onChange({ ...value, text })}
        />
      </section>
    </form>
  );
};
