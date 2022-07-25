import { ReactElement } from 'react';

export type SettingsContextArgs = {
  settingsPanel: SettingsPanel;
  setSettingsPanel: (val: SettingsPanel) => void;
};

export const defaultSettingsPanelState = { key: '', activeTab: 'general' } as SettingsPanel;

export type SettingsPanel = {
  visible?: boolean;
  key: string;
  activeTab: string;
  component: ReactElement;
};

export const defaultArgs = {
  settingsPanel: defaultSettingsPanelState,
  setSettingsPanel: () => {},
} as SettingsContextArgs;

export const Context = ({ settingsPanel, setSettingsPanel }: SettingsContextArgs) => {
  const hideSettingsPanel = () => setSettingsPanel({ ...defaultSettingsPanelState, visible: false });
  return {
    settingsPanel,
    setSettingsPanel,
    showSettingsPanel: (settingsPanel: SettingsPanel) => setSettingsPanel({ ...settingsPanel, visible: true }),
    hideSettingsPanel,
    toggleSettingsPanel: (_settingsPanel: SettingsPanel) => {
      if (_settingsPanel.key === settingsPanel.key) return hideSettingsPanel();
      setSettingsPanel({ ..._settingsPanel, visible: true });
    },
    changeSettingsPanelActiveTab: (activeTab: string) => setSettingsPanel({ ...settingsPanel, activeTab }),

    // togglePageSettings: (visible?: boolean) =>
    //   setPageSettings({
    //     ...pageSettings,
    //     visible: typeof visible === 'boolean' ? visible : !pageSettings.visible,
    //   }),
    // changePageSettingsActiveTab: (activeTab: string) => setPageSettings({ ...pageSettings, activeTab }),
  };
};
