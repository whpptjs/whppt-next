import React, { FC } from 'react';
import { WhpptIcon } from './Icon';

export type WhpptBackButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const WhpptBackButton: FC<WhpptBackButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={'whppt-back-button'} onClick={onClick} disabled={disabled}>
      <div className="whppt-button__icon">
        <WhpptIcon is="back-arrow" />
      </div>
    </button>
  );
};
