import React, { FC } from 'react';
import { WhpptIcon } from './Icon';

type WhpptCheckboxProps = {
  label: string;
  value: boolean;
  onChange: (e: boolean) => void;
};

export const WhpptCheckbox: FC<WhpptCheckboxProps> = ({ label, value, onChange }) => {
  return (
    <div className="whppt-checkbox">
      <label>
        <input className="whppt-checkbox--input" type="checkbox" value={`${value}`} onChange={() => onChange(!value)} />
        <WhpptIcon is={value ? 'checkbox-checked' : 'checkbox'} />
        <span className="whppt-checkbox__label">{label}</span>
        <span className="whppt-checkbox__checkmark"></span>
      </label>
    </div>
  );
};
