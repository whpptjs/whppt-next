import React, { FC } from "react";
import { WhpptInput, WhpptLinkData } from "../../ui/components";
import { EditorArgs } from "../EditorArgs";

export const WhpptLinkEditor: FC<EditorArgs<WhpptLinkData>> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="whppt-plaintext-editor">
      <WhpptInput
        id="whppt-plaintext-input"
        label={options.label}
        type="text"
        error={options.error}
        info={options.info}
        value={value.text}
        onChange={(text) => onChange({ ...value, text })}
      />
    </div>
  );
};
