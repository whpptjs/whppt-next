import React, { FC, ReactElement, useState } from 'react';
import Cookies from 'js-cookie';
import { groupBy, sortBy } from 'lodash';
import { WhpptIcon } from './components/Icon';
import { useWhppt } from '../Context';
import { ToggleWhpptIcon } from '../icons/Toggle';
import { SavePagePopup } from './Popups/SavePage';
import { SaveNavPopup } from './Popups/SaveNav';
import { SaveFooterPopup } from './Popups/SaveFooter';
import { SettingsPanel } from '../Settings/Context';
import { GalleryPanel } from '../Gallery/Context';
import { PageSettings } from '../Page/Settings';
import { SiteSettings } from '../Site/Settings';
import { SiteMap } from '../Site/Map';
import { AppSettings } from '../App/Settings';
import { Gallery } from '../Gallery';

export type MenuItemOptions = {
  closeAllWhpptPanels: () => void;
};
export type MenuItemActionOptions = {
  closeWhpptEditor: () => void;
  closeAllWhpptPanels: () => void;
  toggleSettingsPanel: (val: SettingsPanel) => void;
  toggleGalleryPanel: (val: GalleryPanel) => void;
};

export type MenuItem = {
  key: string;
  label: string;
  icon: ReactElement;
  isActive: (args: { settingsPanel: SettingsPanel; galleryPanel: GalleryPanel }) => boolean;
  action: (args: MenuItemActionOptions) => void;
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
  menuItems: (options) => MenuItem[];
}> = ({ menuItems, lightMode, setLightMode, showFullNav, setShowFullNav }) => {
  const [confirmationPopup, setConfirmationPopup] = useState('');
  const [minimizeGroups, setMinimizeGroups] = useState({});
  const {
    toggleEditing,
    editing,
    api,
    showEditor,
    editorState,
    hideEditor,
    setUser,
    hideSettingsPanel,
    toggleSettingsPanel,
    settingsPanel,
    toggleGalleryPanel,
    hideGalleryPanel,
    galleryPanel,
    page,
    domain,
  } = useWhppt();
  const logout = () => {
    Cookies.remove('authToken');
    api.security.verify().then(user => setUser(user));
  };
  const showPanel = settingsPanel.visible;
  const noPageLoaded = !page || !page._id;
  const closeWhpptEditor = () => {
    setConfirmationPopup('');
    hideEditor();
  };
  const closeAllWhpptPanels = () => {
    hideSettingsPanel();
    hideGalleryPanel();
    closeWhpptEditor();
  };

  const items = [
    {
      key: 'select',
      label: 'Select Component',
      icon: <WhpptIcon is="pointer"></WhpptIcon>,
      action: () => {
        toggleEditing();
        closeAllWhpptPanels();
      },
      isActive: () => editing,
      order: 200,
      group: 'page',
      groupOrder: 200,
      disabled: noPageLoaded,
    },
    {
      key: 'new-page',
      label: 'Create New Page',
      icon: <WhpptIcon is="new-page"></WhpptIcon>,
      isActive: () => editorState.editor === 'newPage',
      action: () => {
        toggleEditing(false);
        closeAllWhpptPanels();
        showEditor('newPage', undefined, undefined, undefined);
      },
      order: 400,
      group: 'page',
      disabled: !domain,
      groupOrder: 200,
    },
    {
      key: 'contentTree',
      label: 'Content Tree',
      icon: <WhpptIcon is="content-tree"></WhpptIcon>,
      order: 300,
      group: 'page',
      groupOrder: 200,
      isActive: () => editorState.editor === 'contentsTree',
      disabled: noPageLoaded || showPanel,
      action: () => {
        toggleEditing(false);
        hideSettingsPanel();
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
      isActive: () => confirmationPopup === 'page',
      disabled: noPageLoaded || showPanel,
      // disabled: !(page || page._id) && showPanel,
      action: () => {
        closeAllWhpptPanels();
        setConfirmationPopup('page');
      },
    },
    {
      key: 'nav',
      label: 'Save Navigation',
      icon: <WhpptIcon is="nav"></WhpptIcon>,
      isActive: () => confirmationPopup === 'nav',
      disabled: noPageLoaded || showPanel,
      action: () => {
        closeAllWhpptPanels();
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
      isActive: () => confirmationPopup === 'footer',
      disabled: noPageLoaded || showPanel,
      action: () => {
        closeAllWhpptPanels();
        setConfirmationPopup('footer');
      },
      order: 300,
    },
    {
      key: 'config-settings',
      label: 'Open Config Settings',
      icon: <WhpptIcon is="globe"></WhpptIcon>,
      action: () => {
        toggleEditing(false);
        closeWhpptEditor();
        hideGalleryPanel();
        toggleSettingsPanel({
          key: 'app',
          activeTab: 'domain',
          component: <AppSettings />,
        });
      },
      isActive: () => settingsPanel.key === 'app',
      order: 200,
      group: 'config',
      groupOrder: 400,
    },
    {
      key: 'site-settings',
      label: 'Open Site Settings',
      icon: <WhpptIcon is="settings"></WhpptIcon>,
      isActive: () => settingsPanel.key === 'siteSettings',
      action: () => {
        toggleEditing(false);
        closeWhpptEditor();
        hideGalleryPanel();
        toggleSettingsPanel({
          key: 'siteSettings',
          activeTab: 'general',
          component: <SiteSettings />,
        });
      },
      order: 400,
      group: 'site',
      groupOrder: 300,
    },
    {
      key: 'site-map',
      label: 'Open Site Map',
      icon: <WhpptIcon is="dashboard"></WhpptIcon>,
      isActive: () => settingsPanel.key === 'siteMap',
      action: () => {
        toggleEditing(false);
        closeWhpptEditor();
        hideGalleryPanel();
        toggleSettingsPanel({
          key: 'siteMap',
          activeTab: 'general',
          component: <SiteMap />,
        });
      },
      order: 500,
      group: 'site',
      groupOrder: 300,
    },
    {
      key: 'page-header',
      label: 'Change Page Header',
      icon: <WhpptIcon is="page-header"></WhpptIcon>,
      action: () => {
        toggleEditing(false);
        hideSettingsPanel();
        if (editorState.editor !== 'changeHeader') return showEditor('changeHeader', undefined, undefined, undefined);
        hideEditor();
      },
      isActive: () => editorState.editor === 'changeHeader',
      order: 600,
      group: 'page',
      groupOrder: 200,
      disabled: noPageLoaded || showPanel,
    },
    {
      key: 'page-settings',
      label: 'Open Page Settings',
      icon: <WhpptIcon is="page-settings"></WhpptIcon>,
      action: ({ toggleSettingsPanel }) => {
        toggleEditing(false);
        closeWhpptEditor();
        hideGalleryPanel();
        toggleSettingsPanel({
          key: 'page',
          activeTab: 'general',
          component: <PageSettings />,
        });
      },
      isActive: ({ settingsPanel }) => settingsPanel.key === 'page',
      order: 700,
      group: 'page',
      groupOrder: 200,
      disabled: noPageLoaded,
    },
    {
      key: 'gallery',
      label: 'Gallery',
      icon: <WhpptIcon is="gallery"></WhpptIcon>,
      action: ({ toggleGalleryPanel }) => {
        toggleEditing(false);
        hideSettingsPanel();
        toggleGalleryPanel({
          key: 'gallery',
          activeTab: 'image',
          component: <Gallery />,
        });
      },
      isActive: ({ galleryPanel }) => galleryPanel.key === 'gallery',
      order: 1200,
      group: 'site',
      groupOrder: 400,
    },
    ...menuItems({ closeAllWhpptPanels }),
  ] as MenuItem[];

  const groupedItems = sortBy(groupBy(sortBy(items, ['order']), 'group'), ['groupOrder']);

  const clickNavGroup = (group: string) => {
    setMinimizeGroups({ ...minimizeGroups, [group]: !minimizeGroups[group] });
  };
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
                    <button className="whppt-main-nav-group--title" onClick={() => clickNavGroup(navItems[0].group)}>
                      {navItems[0].group}
                    </button>
                    {!minimizeGroups[navItems[0].group] && (
                      <ul className="whppt-main-nav-group__content">
                        {navItems.map(item => {
                          return (
                            <li key={item.key}>
                              <button
                                disabled={item.disabled}
                                className={`whppt-main-nav-group__nav-item ${
                                  item.isActive && item.isActive({ settingsPanel, galleryPanel })
                                    ? 'whppt-main-nav-group__nav-item--active'
                                    : ''
                                }`}
                                onClick={() =>
                                  item.action &&
                                  item.action({ closeWhpptEditor, closeAllWhpptPanels, toggleSettingsPanel, toggleGalleryPanel })
                                }>
                                <div className="whppt-main-nav__icon">{item.icon}</div>
                                {showFullNav && <div className="whppt-main-nav-group__label">{item.label}</div>}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
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
