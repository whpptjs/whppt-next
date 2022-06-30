import React, { FC , ReactElement } from 'react';

type WhpptTabProps = {
  children: ReactElement[];
  selectedTab: string
}

export const WhpptTab: FC<WhpptTabProps> = ({ selectedTab, children }) => {

  return (
    <div>
      { children.find(tab => tab.props.name === selectedTab) || children[0] }
    </div>
  );
}
