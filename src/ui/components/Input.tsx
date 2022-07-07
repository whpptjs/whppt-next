import React, { FC } from 'react';
import { WhpptEditorArgs } from '../..';

export type WhpptInputArgs = WhpptEditorArgs & {
  id: string;
  label: string;
  info: string;
  error: string;
  type: 'text' | 'number' | 'file';
  placeholder?: string;
  name?: string;
  onChangeEvent?: (event) => void;
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
  name,
  onChangeEvent,
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
          name={name}
          onChange={(e) => {
            if (onChangeEvent) return onChangeEvent(e);
            onChange(e.target.value);
          }}
        ></input>
      </div>
      <p className="whppt-input-info">{info}</p>
      <p className="whppt-input-error">{error}</p>
    </div>
  );
};
