import React, { FC } from 'react';
import { WhpptInput } from '../../ui/components';
import { WhpptEditorArgs } from '../EditorArgs';

export type BasicEditorOptions = {
  label: string;
  info?: string;
  error?: string;
};

export const WhpptPlaintextEditor: FC<WhpptEditorArgs> = ({
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
