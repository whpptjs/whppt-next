import React, { FC } from "react";
import { WhpptInput } from "../../ui/components";
import { EditorArgs } from "../EditorArgs";

export const WhpptPlaintextEditor: FC<EditorArgs<string>> = ({
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
