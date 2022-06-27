import React, { FC } from 'react';
import { WhpptRichText } from '../ui/components/RichText';
import { WhpptEditorArgs } from '..';

export const WhpptRichtextEditor: FC<WhpptEditorArgs> = ({
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
        onChange={onChange}
      />
    </div>
  );
};
