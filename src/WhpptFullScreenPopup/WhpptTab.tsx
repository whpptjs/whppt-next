import React, { FC , ReactElement } from 'react';

type WhpptTabProps = {
  children: ReactElement[];
  selectedTab: string
}

const defaultTab = 'general';

export const WhpptTab: FC<WhpptTabProps> = ({ selectedTab, children }) => {

  return (
    <div>
      {
        children.find(tab => tab.props.name === selectedTab) ||
        children.find(tab => tab.props.name === defaultTab)
      }
    </div>
  );
}
