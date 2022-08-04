import React from 'react';
import Select from 'react-select';

type WhpptSelectProps<T, R> = {
  items: T[];
  id?: string;
  name?: string;
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  onChange: (i: T) => void;
  value?: R;
};

export const WhpptSelect = <T, R>({
  id,
  name,
  label,
  items,
  isDisabled = false,
  isLoading = false,
  isClearable = false,
  isSearchable = false,
  onChange,
}: // value,
WhpptSelectProps<T, R>) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <Select<T>
        id={id}
        className="basic-single"
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        onChange={e => onChange(e)}
        options={items}
        // value={value}
      />
    </div>
  );
};
