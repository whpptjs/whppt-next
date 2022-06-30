import React, { FC } from 'react';

type WhpptButtonProps = {
  text: string
  onClick: () => void
};

export const Button: FC<WhpptButtonProps> = ({ text, onClick }) => {
  return (
    <button className="whppt-button" onClick={onClick} type="button">
      { text }
    </button>
  );
};
