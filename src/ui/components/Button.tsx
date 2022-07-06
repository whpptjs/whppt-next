import React, { FC } from 'react';
import { WhpptIcon } from './Icon';

type WhpptButtonProps = {
  text: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
};

export const WhpptButton: FC<WhpptButtonProps> = ({
  text,
  icon,
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className="whppt-button"
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      <div className={icon ? 'whppt-button--text' : ''}>{text}</div>
      {icon && <WhpptIcon is={icon} />}
    </button>
  );
};
