import React, { FC, ReactElement } from 'react';

export type WhpptTab = {
  name: string;
  label: string;
  disabled?: boolean;
};

type WhpptTabProps = {
  children: ReactElement[];
  selectedTab: string;
};

export const WhpptTab: FC<WhpptTabProps> = ({ selectedTab, children }) => {
  return <div className="whppt-tab">{children.find(tab => tab.props.name === selectedTab) || children[0]}</div>;
};
