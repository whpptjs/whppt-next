import React, { FC } from 'react';

type WhpptHeaderProps = {
  text: string;
};

export const WhpptHeading: FC<WhpptHeaderProps> = ({ text }) => {
  return <h1 className="whppt-form-heading">{text}</h1>;
};
