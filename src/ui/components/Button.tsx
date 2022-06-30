import React, { FC } from 'react';

type WhpptButtonProps = {
  text: string
};

export const Button: FC<WhpptButtonProps> = ({ text }) => {
  return (
    <button className="whppt-form-button">
      { text }
    </button>
  );
};