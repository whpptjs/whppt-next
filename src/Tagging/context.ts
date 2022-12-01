import { ReactElement } from 'react';

export type TaggingContextArgs = {
  taggingPanel: TaggingPanel;
  setTaggingPanel: (val: TaggingPanel) => void;
};

export const defaultTaggingPanelState = { key: '' } as TaggingPanel;

export type TaggingPanel = {
  visible?: boolean;
  key: string;

  component: ReactElement;
};

export const defaultArgs = {
  taggingPanel: defaultTaggingPanelState,
  setTaggingPanel: () => {},
} as TaggingContextArgs;

export const Context = ({ taggingPanel, setTaggingPanel }: TaggingContextArgs) => {
  const hideTaggingPanel = () => setTaggingPanel({ ...defaultTaggingPanelState, visible: false });
  return {
    taggingPanel,
    setTaggingPanel,
    showTaggingPanel: (taggingPanel: TaggingPanel) => setTaggingPanel({ ...taggingPanel, visible: true }),
    hideTaggingPanel,
    toggleTaggingPanel: (_taggingPanel: TaggingPanel) => {
      if (_taggingPanel.key === taggingPanel.key) return hideTaggingPanel();
      setTaggingPanel({ ..._taggingPanel, visible: true });
    },
  };
};
