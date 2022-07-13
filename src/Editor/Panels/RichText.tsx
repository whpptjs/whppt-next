import React, { FC } from "react";
import { EditorArgs } from "../EditorArgs";
import { WhpptRichText } from "../../ui/components";

export const WhpptRichtextEditor: FC<EditorArgs<string>> = ({
  value,
  onChange,
}) => {
  return (
    <div className="whppt-richtext-editor">
      <WhpptRichText
        id="whppt-richtext-input"
        label="Whppt rich text Label"
        error=""
        info=""
        value={value}
        formatOptionsOnly={false}
        onChange={onChange}
      />
    </div>
  );
};
