import React, { FC } from 'react';
import { WhpptIcon } from './Icon';

type WhpptCheckboxProps = {
  label: string;
  value: string;
  onChange: () => void;
};

export const WhpptCheckbox: FC<WhpptCheckboxProps> = ({ label, value, onChange }) => {
  return (
    <div className="whppt-checkbox">
      <label>
        <input className="whppt-checkbox--input" type="checkbox" value={value} onChange={onChange} />
        <WhpptIcon is={value === 'true' ? 'checkBoxChecked' : 'checkBox'} />
        <span className="whppt-checkbox__label">{label}</span>
        <span className="whppt-checkbox__checkmark"></span>
      </label>
    </div>
  );
};
