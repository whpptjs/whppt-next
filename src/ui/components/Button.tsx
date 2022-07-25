import React, { FC } from 'react';
import { WhpptIcon } from './Icon';

type WhpptButtonProps = {
  text: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  secondary?: boolean;
};

export const WhpptButton: FC<WhpptButtonProps> = ({ text, icon, onClick, disabled, type, secondary }) => {
  return (
    <button
      className={secondary ? 'whppt-secondary-button whppt-button--defaults' : 'whppt-button whppt-button--defaults'}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}>
      <div className={icon ? 'whppt-button--defaults--text' : ''}>{text}</div>

      {icon && (
        <div className="whppt-button__icon">
          <WhpptIcon is={icon} />
        </div>
      )}
    </button>
  );
};
