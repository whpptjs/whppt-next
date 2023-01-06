import React, { FC } from 'react';

export type WhpptTextAreaArgs = {
  id: string;
  label: string;
  info?: string;
  name?: string;
  error: string | undefined;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const WhpptTextArea: FC<WhpptTextAreaArgs> = ({ id, label, error, info, value, onChange, placeholder }) => {
  const _value = `${value}`;
  return (
    <div className="whppt-plaintext">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="whppt-input">
        <textarea value={_value} placeholder={placeholder || ''} onChange={e => onChange(e.target.value)}></textarea>
      </div>
      {info ? <p className="whppt-input-info">{info}</p> : <></>}
      {error ? <p className="whppt-input-error">{error}</p> : <></>}
    </div>
  );
};
