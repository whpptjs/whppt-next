import React, { FC, useState } from 'react';

export type TagSelectProps = {
  values: string[];
  selectedValue: string;
  onChange: (val: string) => void;
};

export const WhpptTagSelect: FC<TagSelectProps> = ({ values, selectedValue, onChange }) => {
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <select
      onClick={() => values.length && setSelectOpen(!selectOpen)}
      value={selectedValue}
      className={`whppt-tag-select__select ${selectOpen ? 'whppt-tag-select__select--open' : ''}`}
      name="cars"
      id="cars">
      {values.map((value, index) => (
        <option key={index} value={value.toLowerCase()} onClick={() => onChange(value)}>
          {value}
        </option>
      ))}
    </select>
  );
};
