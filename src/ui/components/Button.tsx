import React, { FC } from 'react';

type WhpptButtonProps = {
  text: string
  onClick: () => void
};

export const WhpptButton: FC<WhpptButtonProps> = ({ text, onClick }) => {
  return (
    <button className="whppt-button" onClick={onClick} type="button">
      { text }
    </button>
  );
};
