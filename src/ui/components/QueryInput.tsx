import React, { FC, useState } from 'react';
import { WhpptInput } from './Input';
import { WhpptButton } from './Button';

type QueryInputProps = {
  // value: any;
  onChange: (value: string) => void;
  buttonText: string;
  // onClick: () => void;
};

export const WhpptQueryInput: FC<QueryInputProps> = ({ onChange, buttonText }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="whppt-query-input">
      <WhpptInput id="search" label="" info="" error="" type="text" value={searchText} onChange={setSearchText} />
      <WhpptButton onClick={() => onChange(searchText)} text={buttonText} />
    </div>
  );
};
