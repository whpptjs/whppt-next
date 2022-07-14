import React, { FC } from 'react';

export type WhpptTextAreaArgs = {
  id: string;
  label: string;
  info: string;
  error: string;
  value: string;
  onChange: (value: string) => void;
};

export const WhpptTextArea: FC<WhpptTextAreaArgs> = ({ id, label, error, info, value, onChange }) => {
  const _value = `${value}`;
  return (
    <div className="whppt-plaintext">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="whppt-input">
        <textarea value={_value} onChange={e => onChange(e.target.value)}></textarea>
      </div>
      <p className="whppt-input-info">{info}</p>
      <p className="whppt-input-error">{error}</p>
    </div>
  );
};
