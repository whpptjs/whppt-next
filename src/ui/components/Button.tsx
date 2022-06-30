import React, { FC } from 'react';
import { WhpptIcon } from '../../Icon';

type WhpptButtonProps = {
  text: string;
  icon: string | null;
  onClick: () => void;
};

export const WhpptButton: FC<WhpptButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button className="whppt-button" onClick={onClick} type="button">
      <div className={icon ? 'whppt-button--text' : ''}>{text}</div>
      {icon && <WhpptIcon is={icon} />}
    </button>
  );
};
