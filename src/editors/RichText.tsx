import React, { FC } from "react";
import { WhpptEditorArgs } from "..";

export const WhpptRichtextEditor: FC<WhpptEditorArgs> = ({
  value,
  onChange,
}) => {
  return (
    <div className="whppt-richtext-editor">
      <input
        type="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
