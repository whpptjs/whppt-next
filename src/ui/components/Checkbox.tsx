import React, { FC, useState } from 'react';

type CheckboxProps = {
  dark: boolean
  label: string
  value: string | ReadonlyArray<string> | number | undefined
}

export const Checkbox: FC<CheckboxProps> = ({dark, label, value}) => {
  const  [checked, setChecked] = useState(false);

  return (
    <div className={`whppt-checkbox
        ${dark ? 'whppt-checkbox--dark' : ''
      }`}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          value={value}
          onChange={() => setChecked(!checked)}
        />
        <span className="whppt-checkbox__label">{label}</span>
        <span className="whppt-checkbox__checkmark"></span>
      </label>
    </div>
  );
};
