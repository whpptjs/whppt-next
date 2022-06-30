import React, { FC } from 'react';

type ButtonProps = {
  text: string;
};

export const Button: FC<ButtonProps> = ({ text }) => {
  return <button className="whppt-button">{text}</button>;
};
