import React, { FC } from 'react';
import { WhpptIcon } from '../../Icon';

type WhpptButtonProps = {
  text: string;
  icon: string | null;
  onClick: () => void;
  disabled?: boolean;
};

export const WhpptButton: FC<WhpptButtonProps> = ({ text, icon, onClick, disabled }) => {
  return (
    <button className="whppt-button" onClick={onClick} type="button" disabled={disabled}>
      <div className={icon ? 'whppt-button--text' : ''}>{text}</div>
      {icon && <WhpptIcon is={icon} />}
    </button>
  );
};
