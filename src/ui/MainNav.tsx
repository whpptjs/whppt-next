import React, { Dispatch, FC, ReactElement, useState } from 'react';
import Cookies from 'js-cookie';
import { groupBy, sortBy } from 'lodash';
import { WhpptIcon } from './components/Icon';
import { useWhppt } from '../Context';
import { ToggleWhpptIcon } from '../icons/Toggle';
import { SavePagePopup } from './Popups/SavePage';
import { SaveNavPopup } from './Popups/SaveNav';
import { SaveFooterPopup } from './Popups/SaveFooter';
import { defaultSettingsPanelState, SettingsPanel } from './SettingsPanel';

export type MenuItemOptions = {
  closeWhpptPopups: () => void;
  setSettingsPanel: Dispatch<SettingsPanel>;
  settingsPanel: SettingsPanel;
};

export type MenuItem = {
  key: string;
  label: string;
  icon: ReactElement;
  isActive: boolean;
  action: () => void;
  disabled?: boolean;
  order: number;
  group: string;
  groupOrder: number;
};

export const WhpptMainNav: FC<{
  lightMode: boolean;
  setLightMode: Function;
  showFullNav: boolean;
  setShowFullNav: Function;
  setSettingsPanel: Dispatch<SettingsPanel>;
  menuItems: (options) => MenuItem[];
}> = ({ menuItems, lightMode, setLightMode, showFullNav, setShowFullNav, setSettingsPanel }) => {
  const [confirmationPopup, setConfirmationPopup] = useState('');
  const {
    toggleEditing,
    editing,
    pageSettings,
    appSettings,
    siteSettings,
    togglePageSettings,
    toggleAppSettings,
    api,
    toggleSiteSettings,
    showEditor,
    editorState,
    hideEditor,
    setUser,
    settingsPanel,
  } = useWhppt();
  const logout = () => {
    Cookies.remove('authToken');
    api.security.verify().then(user => setUser(user));
  };
  const showPanel = [pageSettings, siteSettings, appSettings].some(setting => setting.visible);

  const closeWhpptPopups = () => {
    toggleSiteSettings(false);
    togglePageSettings(false);
    toggleAppSettings(false);
    setSettingsPanel(defaultSettingsPanelState);
    hideEditor();
  };

  const items = [
    {
      key: 'select',
      label: 'Select Component',
      icon: <WhpptIcon is="pointer"></WhpptIcon>,
      action: () => {
        toggleEditing();
        hideEditor();
        toggleAppSettings(false);
        togglePageSettings(false);
        toggleSiteSettings(false);
      },
      isActive: editing,
      order: 200,
      group: 'page',
      groupOrder: 200,
    },
    {
      key: 'new-page',
      label: 'Create New Page',
      icon: <WhpptIcon is="new-page"></WhpptIcon>,
      isActive: editorState.editor === 'newPage',
      action: () => {
        toggleEditing(false);
        toggleAppSettings(false);
        togglePageSettings(false);
        toggleSiteSettings(false);
        setConfirmationPopup('');
        showEditor('newPage', undefined, undefined, undefined);
      },
      order: 400,
      group: 'page',
      groupOrder: 200,
    },
    {
      key: 'contentTree',
      label: 'Content Tree',
      icon: <WhpptIcon is="content-tree"></WhpptIcon>,
      order: 300,
      group: 'page',
      groupOrder: 200,
      isActive: editorState.editor === 'contentsTree',
      disabled: showPanel,
      action: () => {
        toggleEditing(false);
        toggleAppSettings(false);
        togglePageSettings(false);
        toggleSiteSettings(false);
        setConfirmationPopup('');
        if (editorState.editor !== 'contentsTree') return showEditor('contentsTree', undefined, undefined, undefined);
        hideEditor();
      },
    },
    {
      key: 'save',
      label: 'Save Page',
      icon: <WhpptIcon is="save"></WhpptIcon>,
      order: 500,
      group: 'page',
      groupOrder: 200,
      isActive: confirmationPopup === 'page',
      disabled: showPanel,
      action: () => {
        setConfirmationPopup('page');
      },
    },
    {
      key: 'nav',
      label: 'Save Navigation',
      icon: <WhpptIcon is="nav"></WhpptIcon>,
      isActive: confirmationPopup === 'nav',
      disabled: showPanel,
      action: () => {
        setConfirmationPopup('nav');
      },
      order: 200,
      group: 'site',
      groupOrder: 300,
    },
    {
      key: 'footer',
      label: 'Save Footer',
      icon: <WhpptIcon is="footer"></WhpptIcon>,
      group: 'site',
      groupOrder: 300,
      isActive: confirmationPopup === 'footer',
      disabled: showPanel,
      action: () => {
        setConfirmationPopup('footer');
      },
      order: 300,
    },
    {
      key: 'config-settings',
      label: 'Open Config Settings',
      icon: <WhpptIcon is="globe"></WhpptIcon>,
      action: () => {
        toggleSiteSettings(false);
        togglePageSettings(false);
        toggleEditing(false);
        toggleAppSettings();
        hideEditor();
        setConfirmationPopup('');
      },
      isActive: appSettings.visible,
      order: 200,
      group: 'config',
      groupOrder: 400,
    },
    {
      key: 'site-settings',
      label: 'Open Site Settings',
      icon: <WhpptIcon is="settings"></WhpptIcon>,
      isActive: siteSettings.visible,
      action: () => {
        toggleAppSettings(false);
        togglePageSettings(false);
        toggleEditing(false);
        toggleSiteSettings();
        setConfirmationPopup('');
        hideEditor();
      },
      order: 400,
      group: 'site',
      groupOrder: 300,
    },
    {
      key: 'page-settings',
      label: 'Open Page Settings',
      icon: <WhpptIcon is="page-settings"></WhpptIcon>,
      action: () => {
        toggleAppSettings(false);
        toggleSiteSettings(false);
        togglePageSettings();
        toggleEditing(false);
        hideEditor();
      },
      isActive: pageSettings.visible,
      order: 600,
      group: 'page',
      groupOrder: 200,
    },
    {
      key: 'dashboard',
      label: 'Open Dashboard',
      icon: <WhpptIcon is="dashboard"></WhpptIcon>,
      order: 300,
      group: 'config',
      groupOrder: 400,
    },
    ...menuItems({ closeWhpptPopups, setSettingsPanel, settingsPanel }),
  ] as MenuItem[];

  const groupedItems = sortBy(groupBy(sortBy(items, ['order']), 'group'), ['groupOrder']);

  return (
    <div>
      {confirmationPopup && (
        <>
          {confirmationPopup === 'page' && <SavePagePopup callback={() => setConfirmationPopup('')} />}
          {confirmationPopup === 'nav' && <SaveNavPopup callback={() => setConfirmationPopup('')} />}
          {confirmationPopup === 'footer' && <SaveFooterPopup callback={() => setConfirmationPopup('')} />}
        </>
      )}
      <div className={`whppt-main-nav ${showFullNav ? 'whppt-main-nav--show-full-nav' : ''}`}>
        <div className={`whppt-main-nav-contents  ${showFullNav ? 'whppt-main-nav-contents--show-full-nav' : ''}`}>
          <div>
            <button onClick={() => setShowFullNav()} className="whppt-main-nav__logo">
              <div className="whppt-main-nav__icon">
                <WhpptIcon is="bruce"></WhpptIcon>
              </div>
              {showFullNav && <div className="whppt-main-nav__whppt-label">Whppt</div>}
            </button>
            <div>
              {groupedItems.map(navItems => {
                return (
                  <div className="whppt-main-nav-group" key={navItems[0].group}>
                    <div className="whppt-main-nav-group--title">{navItems[0].group}</div>
                    <ul className="whppt-main-nav-group__content">
                      {navItems.map(item => {
                        return (
                          <li key={item.key}>
                            <button
                              disabled={item.disabled}
                              className={`whppt-main-nav-group__nav-item ${item.isActive ? 'whppt-main-nav-group__nav-item--active' : ''}`}
                              onClick={() => item.action && item.action()}>
                              <div className="whppt-main-nav__icon">{item.icon}</div>
                              {showFullNav && <div className="whppt-main-nav-group__label">{item.label}</div>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <button className="whppt-main-nav-group__nav-item" onClick={() => logout()}>
              <div className="whppt-main-nav__icon">
                <WhpptIcon is={'logout'}></WhpptIcon>
              </div>
              {showFullNav && <div className="whppt-main-nav-group__label">Log Out</div>}
            </button>
            <button onClick={() => setLightMode()} className="whppt-main-nav-group__toggle">
              <div className="whppt-main-nav__icon">
                <ToggleWhpptIcon active={lightMode} />
              </div>
              {showFullNav && <div className="whppt-main-nav-group__toggle--label ">{lightMode ? 'Light Mode' : 'Dark Mode'}</div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
