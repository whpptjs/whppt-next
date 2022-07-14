import React, { FC } from 'react';

type WhpptHeaderProps = {
  text: string;
};

export const Heading: FC<WhpptHeaderProps> = ({ text }) => {
  return (
    <h1 className="whppt-form-heading" style={{ display: 'flex', width: '100%', alignItems: 'center', padding: '0.75rem 1.25rem' }}>
      {text}
    </h1>
  );
};
