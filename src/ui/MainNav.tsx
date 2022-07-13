import React, { FC, useState } from 'react';
import Cookies from 'js-cookie';
import { groupBy, sortBy } from 'lodash';
import { WhpptIcon } from './components/Icon';
import { useWhppt } from '../Context';
import { ToggleWhpptIcon } from '../icons/Toggle';
import { SavePagePopup } from './Popups/SavePage';
import { SaveNavPopup } from './Popups/SaveNav';
import { SaveFooterPopup } from './Popups/SaveFooter';

export const WhpptMainNav: FC<{
  lightMode: boolean;
  setLightMode: Function;
  showFullNav: boolean;
  setShowFullNav: Function;
}> = ({ lightMode, setLightMode, showFullNav, setShowFullNav }) => {
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
  } = useWhppt();
  const logout = () => {
    Cookies.remove('authToken');
    api.security.verify().then((user) => setUser(user));
  };

  const items = [
    {
      key: 'select',
      label: 'Select Component',
      icon: 'pointer',
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
      icon: 'new-page',
      isActive: editorState.editor === 'newPage',
      action: () => {
        toggleEditing(false);
        toggleAppSettings(false);
        togglePageSettings(false);
        toggleSiteSettings(false);
        showEditor('newPage', undefined, undefined, undefined);
      },
      order: 300,
      group: 'page',
      groupOrder: 200,
    },
    {
      key: 'save',
      label: 'Save Page',
      icon: 'save',
      order: 400,
      group: 'page',
      groupOrder: 200,
      action: () => {
        setConfirmationPopup('save');
      },
    },
    {
      key: 'nav',
      label: 'Save Navigation',
      icon: 'nav',
      action: () => {
        setConfirmationPopup('nav');
      },
      order: 500,
      group: 'site',
      groupOrder: 300,
    },
    {
      key: 'footer',
      label: 'Save Footer',
      icon: 'footer',
      group: 'site',
      groupOrder: 300,
      action: () => {
        setConfirmationPopup('footer');
      },
      order: 600,
    },
    {
      key: 'config-settings',
      label: 'Open Config Settings',
      icon: 'globe',
      action: () => {
        toggleSiteSettings(false);
        togglePageSettings(false);
        toggleEditing(false);
        toggleAppSettings();
        hideEditor();
        Cookies.set('authToken', 'THIS IS A TEST');
      },
      isActive: appSettings.visible,
      order: 800,
      group: 'config',
      groupOrder: 400,
    },
    {
      key: 'site-settings',
      label: 'Open Site Settings',
      icon: 'settings',
      isActive: siteSettings.visible,
      action: () => {
        toggleAppSettings(false);
        togglePageSettings(false);
        toggleEditing(false);
        toggleSiteSettings();
        hideEditor();
      },
      order: 900,
      group: 'site',
      groupOrder: 300,
    },
    {
      key: 'page-settings',
      label: 'Open Page Settings',
      icon: 'page-settings',
      action: () => {
        toggleAppSettings(false);
        toggleSiteSettings(false);
        togglePageSettings();
        toggleEditing(false);
        hideEditor();
      },
      isActive: pageSettings.visible,
      order: 1000,
      group: 'page',
      groupOrder: 200,
    },
    {
      key: 'dashboard',
      label: 'Open Dashboard',
      icon: 'dashboard',
      order: 1100,
      group: 'config',
      groupOrder: 400,
    },
    //TODO pass menuItems in from client website
    // ...this.$whppt.menuItems.map(i => ({ ...i, action: this.runAction(i.action) })),
  ];

  const groupedItems = sortBy(groupBy(sortBy(items, ['order']), 'group'), [
    'groupOrder',
  ]);

  return (
    <div>
      {confirmationPopup && (
        <>
          {confirmationPopup === 'save' && (
            <SavePagePopup callback={() => setConfirmationPopup('')} />
          )}
          {confirmationPopup === 'nav' && (
            <SaveNavPopup callback={() => setConfirmationPopup('')} />
          )}
          {confirmationPopup === 'footer' && (
            <SaveFooterPopup callback={() => setConfirmationPopup('')} />
          )}
        </>
      )}
      <div
        className={`whppt-main-nav ${
          showFullNav ? 'whppt-main-nav--show-full-nav' : ''
        }`}
      >
        <div
          className={`whppt-main-nav-contents  ${
            showFullNav ? 'whppt-main-nav-contents--show-full-nav' : ''
          }`}
        >
          <div>
            <button
              onClick={() => setShowFullNav()}
              className="whppt-main-nav__logo"
            >
              <div className="whppt-main-nav__icon">
                <WhpptIcon is="bruce"></WhpptIcon>
              </div>
              {showFullNav && (
                <div className="whppt-main-nav__whppt-label">Whppt</div>
              )}
            </button>
            <div>
              {groupedItems.map((navItems) => {
                return (
                  <div className="whppt-main-nav-group" key={navItems[0].group}>
                    <div className="whppt-main-nav-group--title">
                      {navItems[0].group}
                    </div>
                    <ul className="whppt-main-nav-group__content">
                      {navItems.map((item) => {
                        return (
                          <li key={item.key}>
                            <button
                              disabled={item.disabled}
                              className={`whppt-main-nav-group__nav-item ${
                                item.isActive
                                  ? 'whppt-main-nav-group__nav-item--active'
                                  : ''
                              }`}
                              onClick={() => item.action && item.action()}
                            >
                              <div className="whppt-main-nav__icon">
                                <WhpptIcon is={item.icon}></WhpptIcon>
                              </div>
                              {showFullNav && (
                                <div className="whppt-main-nav-group__label">
                                  {item.label}
                                </div>
                              )}
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
            <button
              className="whppt-main-nav-group__nav-item"
              onClick={() => logout()}
            >
              <div className="whppt-main-nav__icon">
                <WhpptIcon is={'logout'}></WhpptIcon>
              </div>
              {showFullNav && (
                <div className="whppt-main-nav-group__label">Log Out</div>
              )}
            </button>
            <button
              onClick={() => setLightMode()}
              className="whppt-main-nav-group__toggle"
            >
              <div className="whppt-main-nav__icon">
                <ToggleWhpptIcon active={lightMode} />
              </div>
              {showFullNav && (
                <div className="whppt-main-nav-group__toggle--label ">
                  {lightMode ? 'Light Mode' : 'Dark Mode'}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
