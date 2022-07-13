import React, { FC } from 'react';

type WhpptCheckboxProps = {
  label: string;
  value: string | ReadonlyArray<string> | number | undefined;
  onChange: () => void;
};

export const WhpptCheckbox: FC<WhpptCheckboxProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="whppt-checkbox">
      <label>
        <input type="checkbox" value={value} onChange={onChange} />
        <span className="whppt-checkbox__label">{label}</span>
        <span className="whppt-checkbox__checkmark"></span>
      </label>
    </div>
  );
};
