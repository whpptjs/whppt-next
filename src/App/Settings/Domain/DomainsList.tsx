import React, { FC } from 'react';
import { Domain } from 'src/App/Model';

export const DomainsList: FC<{ domains: Domain[] }> = ({ domains }) => {
  return (
    <section className="whppt-form-section ">
      {domains.map((domain, domainKey) => (
        <div key={domainKey}>
          <div>{domain.name}</div>
        </div>
      ))}
    </section>
  );
};
