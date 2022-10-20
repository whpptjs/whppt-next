import React from 'react';
import Select from 'react-select';

type WhpptSelectProps<T> = {
  id?: string;
  name?: string;
  info?: string;
  idField?: keyof T;
  label: string;
  items: T[];
  value?: T;
  onChange: (item: T) => void;
  getOptionLabel: (option: T) => string;
  isOptionSelected?: (option: T) => boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  error?: string;
};

export const WhpptSelect = <T extends {}>({
  id,
  name,
  label,
  items,
  isDisabled = false,
  isLoading = false,
  isClearable = false,
  isSearchable = true,
  onChange,
  error,
  value,
  info,
  getOptionLabel,
  isOptionSelected,
  idField = '_id' as keyof T,
  ...props
}: WhpptSelectProps<T>) => {
  const _isOptionSelected = (item: T) => item && value && item[idField] === value[idField];

  return (
    <div className="whppt-form-field">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <Select<T>
        id={id}
        className="whppt-select"
        classNamePrefix="whppt-select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        onChange={e => onChange(e)}
        options={items}
        value={value}
        getOptionLabel={getOptionLabel}
        isOptionSelected={isOptionSelected || _isOptionSelected}
        {...props}
      />
      <div>
        {!error && <p className="whppt-input-info">{info}</p>}
        {error && <p className="whppt-input-error">{error}</p>}
      </div>
    </div>
  );
};
