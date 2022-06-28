import React, { FC } from 'react';
import { WhpptInput } from '../ui/components/Input';
import { WhpptEditorArgs } from '..';

export const WhpptPlaintextEditor: FC<WhpptEditorArgs> = ({
  value,
  onChange,
}) => {
  return (
    <div className="whppt-plaintext-editor">
      <WhpptInput
        id="whppt-plaintext-input"
        label="Whppt Label"
        type="text"
        error="Error happened"
        info="Input helper"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
