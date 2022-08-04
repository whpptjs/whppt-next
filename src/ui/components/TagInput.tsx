import React, { FC } from 'react';
import { WhpptInput } from './Input';
import { WhpptButton } from './Button';

type TagInputProps = {
  value: any;
  onChange: (value: string) => void;
  buttonText: string;
  onClick: () => void;
};

export const WhpptTagInput: FC<TagInputProps> = ({ value, onChange, buttonText, onClick }) => {
  return (
    <div className="whppt-tag-input">
      <WhpptInput id="search" label="" info="" error="" type="text" value={value} onChange={onChange} onEnterKeyPressed={onClick} />
      <WhpptButton onClick={onClick} text={buttonText} />
    </div>
  );
};
