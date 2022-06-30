import React, { FC } from 'react';

type WhpptButtonProps = {
  text: string
  onClick: () => void
  disabled?: boolean
};

export const WhpptButton: FC<WhpptButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button className="whppt-button" onClick={onClick} type="button" disabled={disabled}>
      { text }
    </button>
  );
};
