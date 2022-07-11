import React, { FC } from 'react';
import { WhpptRichText } from '../../ui/components';
import { WhpptEditorArgs } from '../EditorArgs';

export const WhpptFormattedTextEditor: FC<WhpptEditorArgs> = ({
  value,
  onChange,
}) => {
  return (
    <div className="whppt-richtext-editor">
      <WhpptRichText
        id="whppt-formatted-text-input"
        label="Whppt rich text Label"
        error=""
        info=""
        value={value}
        formatOptionsOnly={true}
        onChange={onChange}
      />
    </div>
  );
};
