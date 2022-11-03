import React, { FC } from 'react';

export type WhpptMoneyInputArgs = {
  id: string;
  label: string;
  info?: string;
  error?: string | undefined;
  type: 'number';
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  name?: string;
  onChange?: (value: number) => void;
  onEnterKeyPressed?: (event) => void;
  value: string;
};

export const WhpptMoneyInput: FC<WhpptMoneyInputArgs> = ({
  id,
  label,
  info,
  error,
  type,
  placeholder,
  value,
  onChange,
  name,
  onEnterKeyPressed,
  disabled,
  max,
  min,
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
          disabled={disabled}
          value={`${Number(_value) / 100}`}
          placeholder={placeholder || ''}
          name={name}
          max={max}
          min={min}
          onChange={e => {
            onChange(Number(e.target.value) * 100);
          }}></input>
      </div>
      <div>
        {!error && <p className="whppt-input-info">{info}</p>}
        {error && <p className="whppt-input-error">{error}</p>}
      </div>
    </div>
  );
};
