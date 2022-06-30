import React, { FC } from 'react';

type WhpptCheckboxProps = {
  dark: boolean
  label: string
  value: string | ReadonlyArray<string> | number | undefined
  onChange: () => void
}

export const WhpptCheckbox: FC<WhpptCheckboxProps> = ({ dark, label, value, onChange }) => {
  return (
    <div className={`whppt-checkbox
        ${dark ? 'whppt-checkbox--dark' : ''
      }`}>
      <label>
        <input
          type="checkbox"
          value={value}
          onChange={onChange}
        />
        <span className="whppt-checkbox__label">{label}</span>
        <span className="whppt-checkbox__checkmark"></span>
      </label>
    </div>
  );
};
