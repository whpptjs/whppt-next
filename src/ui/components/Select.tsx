import React from 'react';
import Select from 'react-select';

type WhpptSelectProps<T> = {
  id?: string;
  name?: string;
  idField?: keyof T;
  label: string;
  items: T[];
  value?: T;
  onChange: (item: T) => void;
  getOptionLabel?: (option: T) => string;
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
  getOptionLabel,
  isOptionSelected,
  idField = '_id' as keyof T,
  ...props
}: WhpptSelectProps<T>) => {
  const _isOptionSelected = (item: T) => item && value && item[idField] === value[idField];

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
        value={value}
        getOptionLabel={getOptionLabel}
        isOptionSelected={isOptionSelected || _isOptionSelected}
        {...props}
      />

      {error && typeof error === 'string' && <span className="whppt-input-error">{error}</span>}
      {error && Array.isArray(error) && (
        <div>
          {error.map((err, index) => (
            <span key={index} className="whppt-input-error">
              {err} {index + 1 < error.length && <span>, </span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
