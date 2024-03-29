import React, { FC } from 'react';

export type WhpptInputArgs = {
  id: string;
  label: string;
  info?: string;
  error?: string | undefined;
  type: 'text' | 'number' | 'checkbox' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  name?: string;
  onChangeEvent?: (event) => void;
  onChange?: (value: string) => void;
  onEnterKeyPressed?: (event) => void;
  onBlur?: (event) => void;
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
  max,
  min,
  onBlur,
}) => {
  const _value = `${value}`;
  return (
    <div className="whppt-form-field">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="whppt-input">
        <input
          type={type}
          value={_value}
          placeholder={placeholder || ''}
          name={name}
          max={max}
          min={min}
          disabled={disabled}
          onKeyPress={e => {
            if (onEnterKeyPressed && e.key === 'Enter') onEnterKeyPressed(_value);
          }}
          onBlur={e => {
            if (onBlur) onBlur(e);
          }}
          onChange={e => {
            if (onChangeEvent) return onChangeEvent(e);
            onChange(e.target.value);
          }}></input>
      </div>
      <div>
        {!error && <p className="whppt-input-info">{info}</p>}
        {error && <p className="whppt-input-error">{error}</p>}
      </div>
    </div>
  );
};
