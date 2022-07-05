import React, { FC } from 'react';
import { WhpptEditorArgs } from '../..';

export type WhpptInputArgs = WhpptEditorArgs & {
  id: string;
  label: string;
  info: string;
  error: string;
  type: 'text' | 'number' | 'checkbox';
  placeholder?: string;
};

export const WhpptInput: FC<WhpptInputArgs> = ({
  id,
  label,
  info,
  error,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const _value = `${value}`;
  return (
    <div className="whppt-plaintext">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="whppt-input">
        <input
          type={type}
          value={_value}
          placeholder={placeholder || ''}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
      <p className="whppt-input-info">{info}</p>
      <p className="whppt-input-error">{error}</p>
    </div>
  );
};
