import React, { FC } from 'react';

export type WhpptInputArgs = {
  id: string;
  label: string;
  info?: string;
  error?: string | undefined;
  type: 'text' | 'number' | 'checkbox' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  onChangeEvent?: (event) => void;
  onChange?: (value: string) => void;
  onEnterKeyPressed?: (event) => void;
  value: string;
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
  onEnterKeyPressed,
  disabled,
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
          disabled={disabled}
          onKeyPress={e => {
            if (onEnterKeyPressed && e.key === 'Enter') onEnterKeyPressed(e.target.value);
          }}
          onChange={e => {
            if (onChangeEvent) return onChangeEvent(e);
            onChange(e.target.value);
          }}></input>
      </div>
      {info && <p className="whppt-input-info">{info}</p>}
      {error && <p className="whppt-input-error">{error}</p>}
    </div>
  );
};
