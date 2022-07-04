import React, { FC } from 'react';
import { WhpptEditorArgs } from '../..';

export type WhpptInputArgs = WhpptEditorArgs & {
  id: string;
  label: string;
  info: string;
  error: string;
  type: 'text' | 'number' | 'checkbox';
  placeholder?: string
};

export const WhpptInput: FC<WhpptInputArgs> = ({
  id,
  label,
  info,
  error,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const _value = `${value}`;
  return (
    <div className="whppt-plaintext">
      <div className="whppt-label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="whppt-input">
        <input
          type={type}
          value={_value}
          placeholder={placeholder || ''}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
      <p className="whppt-input-info">{info}</p>
      <p className="whppt-input-error">{error}</p>
    </div>
  );
};

{
  /* 

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

$danger-600: #e53e3e;

.whppt-Input {
  label {
    display: block;
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
    letter-spacing: 0.025em;
    font-size: 0.75rem;
  }

  .whppt-error {
    font-size: 0.75rem;
    color: $danger-600;
  }

  Input {
    appearance: none;
    display: block;
    width: 100%;
    background-color: $gray-200;
    color: $gray-700;
    border: 1px solid $gray-200;
    border-radius: 0.25rem;
    padding: 1rem 2rem 1rem 0.75rem;
    line-height: 1.25;
    resize: vertical;

    &:focus {
      outline: none;
      background-color: white;
      border-color: $gray-500;
    }
  }

  .info {
    font-size: 0.75rem;
    font-style: italic;
    color: $gray-500;
  }

  &--dark {
    label {
      color: white;
    }

    Input {
      background-color: $gray-900;
      color: white;
      border: 1px solid $gray-500;

      &:focus {
        background-color: $gray-800;
      }
    }
  }
}
</style> */
}
