import React, { FC } from 'react';

export type WhpptInputArgs = {
  id: string;
  label: string;
  info: string;
  error: string;
  type: 'text' | 'number' | 'file' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  onChangeEvent?: (event) => void;
  onChange?: (value: string) => void;
  value: string;
};

export const WhpptInput: FC<WhpptInputArgs> = ({ id, label, info, error, type, placeholder, value, onChange, name, onChangeEvent }) => {
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
          onChange={e => {
            if (onChangeEvent) return onChangeEvent(e);
            onChange(e.target.value);
          }}></input>
      </div>
      <p className="whppt-input-info">{info}</p>
      <p className="whppt-input-error">{error}</p>
    </div>
  );
};
