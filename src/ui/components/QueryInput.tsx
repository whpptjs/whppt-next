import React, { FC } from 'react';
import { WhpptInput } from './Input';
import { WhpptButton } from './Button';

type QueryInputProps = {
  value: any;
  onChange: (value: string) => void;
  buttonText: string;
  onClick: () => void;
};

export const WhpptQueryInput: FC<QueryInputProps> = ({ value, onChange, buttonText, onClick }) => {
  return (
    <div className="whppt-query-input">
      <WhpptInput id="search" label="" info="" error="" type="text" value={value} onChange={onChange} />
      <WhpptButton onClick={onClick} text={buttonText} />
    </div>
  );
};
