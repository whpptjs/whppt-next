import React, { FC, useState } from 'react';
import { WhpptInput } from './Input';
import { WhpptButton } from './Button';

type WhpptQueryInputProps = {
  value: any;
  onChange: (value: string) => void;
  buttonText: string;
  onEnterKeyPressed?: (event) => void;
};

export const WhpptQueryInput: FC<WhpptQueryInputProps> = ({ onChange, buttonText, onEnterKeyPressed }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="whppt-query-input">
      <WhpptInput
        onEnterKeyPressed={onEnterKeyPressed}
        id="search"
        label=""
        info=""
        error=""
        type="text"
        value={searchText}
        onChange={setSearchText}
      />
      <WhpptButton onClick={() => onChange(searchText)} text={buttonText} />
    </div>
  );
};
