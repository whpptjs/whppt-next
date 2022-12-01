import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { contentTree, Whppt } from '../Context';
import { ToastContainer } from 'react-toastify';
import type { WhpptAppEditorsArg } from '../Editor/EditorPanel';
import { WhpptEditorPanel } from '../Editor/EditorPanel';
import { SettingsPanel } from '../Settings/Panel';
import { MenuItem, MenuItemOptions, WhpptMainNav } from '../ui/MainNav';
import { Api } from '../Api';
import * as editor from '../Editor/Context';
import * as appContext from './Context';
import * as siteContext from '../Site/Context';
import * as securityContext from '../Security/Context';
import * as settingsContext from '../Settings/Context';
import { WhpptLogin } from '../ui/Login';
import { WhpptSetNewUserDetails } from '../ui/Login/WhpptSetNewUserDetails';
import { Domain } from './Model';
import { GalleryPanel } from '../Gallery/Panel';
import * as galleryContext from '../Gallery/Context';
import { Footer, Nav } from '../Site/Model';
import { PageTheme, PageData, pageFactory } from '../Page';
import { ComponentData } from '../ContentComponents';

export * from './Model';

export type WhpptComponentPlugins = {
  componentSettings: {
    showOnRootOnly: boolean;
    Component: FC<{ value: ComponentData; onChange: (val: ComponentData) => void }>;
  }[];
  theme: { bgColours: { [key: string]: { backgroundColor: string; text: string } } };
};

export type WhpptAppOptions = {
  children: ReactElement[] | ReactElement;
  domain?: Domain;
  nav?: Nav<any>;
  footer?: Footer<any>;
  page?: PageData;
  editors: WhpptAppEditorsArg;
  error: (error: Error) => ReactElement;
  menuItems?: (options: MenuItemOptions) => MenuItem[];
  pageThemes?: PageTheme[];
  plugins: WhpptComponentPlugins;
};
export type WhpptApp = FC<WhpptAppOptions>;

export const WhpptApp: FC<WhpptAppOptions> = ({
  children,
  domain: defaultDomain,
  nav: defaultNav,
  footer: defaultFooter,
  page: defaultPage,
  editors,
  menuItems = () => [],
  pageThemes = [],
  error,
  plugins = {} as WhpptComponentPlugins,
}) => {
  const [renderChildren, setRenderChildren] = useState(process.env.NEXT_PUBLIC_DRAFT !== 'true');
  const [isDraftMode] = useState(process.env.NEXT_PUBLIC_DRAFT === 'true');
  const [lightMode, setLightMode] = useState(false);
  const [showFullNav, setShowFullNav] = useState(false);
  const [navWidth, setNavWidth] = useState('96px');
  const [errorState, setError] = useState<Error>();
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState(editor.defaultState);
  const [domain, setDomain] = useState(defaultDomain);
  const [page, setPage] = useState(pageFactory.init(defaultDomain, defaultPage));
  const [nav, setNav] = useState(defaultNav);
  const [footer, setFooter] = useState(defaultFooter);
  const [settingsData, setSettingsData] = useState(siteContext.defaultSettingsData);
  const [user, setUser] = useState(securityContext.defaultState);
  const [settingsPanel, setSettingsPanel] = useState(settingsContext.defaultSettingsPanelState);
  const [galleryPanel, setGalleryPanel] = useState(galleryContext.defaultGalleryPanelState);
  const [themes] = useState(pageThemes);
  const api = useMemo(() => {
    return Api();
  }, []);

  const context = useMemo(() => {
    return {
      ...editor.Context({
        editing,
        setEditing,
        editorState,
        setEditorState,
      }),
      api,
      ...appContext.Context({
        domain,
        setDomain,
      }),
      ...siteContext.Context({
        nav,
        setNav,
        footer,
        setFooter,
        settingsData,
        setSettingsData,
      }),
      ...securityContext.Context({ user, setUser }),
      ...settingsContext.Context({ settingsPanel, setSettingsPanel }),
      ...galleryContext.Context({ galleryPanel, setGalleryPanel }),
      page,
      setPage,
      contentTree,
      navWidth,
      isDraftMode,
      themes,
      plugins,
    };
  }, [
    editing,
    editorState,
    api,
    domain,
    nav,
    footer,
    settingsData,
    user,
    settingsPanel,
    galleryPanel,
    page,
    navWidth,
    isDraftMode,
    themes,
    plugins,
  ]);

  useEffect(() => {
    api.security
      .verify()
      .then(user => setUser(user))
      .catch(err => setError(err));
  }, [api]);

  const checkIfAUserIsSignedIn = () => {
    //TODO work this out better
    if (!user || user._id === 'guest') return false;
    return true;
  };

  useEffect(() => {
    const isDraft = process.env.NEXT_PUBLIC_DRAFT === 'true';
    setRenderChildren(!isDraft || (user && user._id !== 'guest'));
  }, [setRenderChildren, user]);

  useEffect(() => {
    // TODO: move the px values to a file that can be imported here and in the tailwind config
    setNavWidth(showFullNav ? '256px' : '96px');
  }, [navWidth, showFullNav]);

  return (
    <div>
      <Whppt.Provider value={context}>
        <div className={`whppt-app ${lightMode ? 'whppt-lightMode' : ''}`}>
          {process.env.NEXT_PUBLIC_DRAFT === 'true' ? (
            <>
              {checkIfAUserIsSignedIn() ? (
                <>
                  <WhpptMainNav
                    lightMode={lightMode}
                    showFullNav={showFullNav}
                    menuItems={menuItems}
                    setLightMode={() => setLightMode(!lightMode)}
                    setShowFullNav={() => setShowFullNav(!showFullNav)}
                  />
                  <SettingsPanel showFullNav={showFullNav} />
                  <GalleryPanel showFullNav={showFullNav} />
                </>
              ) : (
                <WhpptLogin />
              )}
              <WhpptSetNewUserDetails />
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'colored'}
              />
            </>
          ) : (
            <></>
          )}
          {errorState ? (
            error(errorState)
          ) : (
            <div className="whppt-app__content">
              {renderChildren ? <div>{children}</div> : <></>}
              {process.env.NEXT_PUBLIC_DRAFT === 'true' ? <WhpptEditorPanel editors={editors}></WhpptEditorPanel> : <></>}
            </div>
          )}
        </div>
      </Whppt.Provider>
    </div>
  );
};
