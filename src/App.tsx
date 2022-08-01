import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { contentTree, Whppt } from './Context';
import { ToastContainer } from 'react-toastify';
import type { WhpptAppEditorsArg } from './Editor/EditorPanel';
import { WhpptEditorPanel } from './Editor/EditorPanel';
import { SettingsPanel } from './Settings/Panel';
import { MenuItem, MenuItemOptions, WhpptMainNav } from './ui/MainNav';
import { Api } from './Api';
import * as editor from './Editor/Context';
import * as appContext from './App/Context';
import * as siteContext from './Site/Context';
import * as pageContext from './Page/Context';
import * as securityContext from './Security/Context';
import * as settingsContext from './Settings/Context';
import { WhpptLogin } from './ui/Login';
import { WhpptSetNewUserDetails } from './ui/Login/WhpptSetNewUserDetails';

export type WhpptAppOptions = {
  children: ReactElement[] | ReactElement;
  editors: WhpptAppEditorsArg;
  error: (error: Error) => ReactElement;
  menuItems?: (options: MenuItemOptions) => MenuItem[];
  initNav?: (nav: any) => any;
  initFooter?: (footer: any) => any;
};
export type WhpptApp = FC<WhpptAppOptions>;

export const WhpptApp: FC<WhpptAppOptions> = ({ children, editors, menuItems = () => [], error, initNav, initFooter }) => {
  const [renderChildren, setRenderChildren] = useState(process.env.NEXT_PUBLIC_DRAFT !== 'true');
  const [lightMode, setLightMode] = useState(false);
  const [showFullNav, setShowFullNav] = useState(false);
  const [navWidth, setNavWidth] = useState('96px');
  const [errorState, setError] = useState<Error>();
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState(editor.defaultState);
  const [domain, setDomain] = useState(appContext.defaultState);
  const [page, setPage] = useState(pageContext.defaultState);
  const [nav, setNav] = useState(siteContext.defaultNavState);
  const [footer, setFooter] = useState(siteContext.defaultFooterState);
  const [settingsData, setSettingsData] = useState(siteContext.defaultSettingsData);
  const [pageSettingsData, setPageSettingsData] = useState(pageContext.defaultPageSettingsData);
  const [user, setUser] = useState(securityContext.defaultState);
  const [settingsPanel, setSettingsPanel] = useState(settingsContext.defaultSettingsPanelState);
  const api = useMemo(() => {
    return Api();
  }, []);

  const context = useMemo(
    () => ({
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
      domain,
      ...pageContext.Context({
        page,
        setPage,
        pageSettingsData,
        setPageSettingsData,
      }),
      ...siteContext.Context({
        nav,
        setNav,
        initNav,
        footer,
        setFooter,
        initFooter,
        settingsData,
        setSettingsData,
      }),
      ...securityContext.Context({ user, setUser }),
      ...settingsContext.Context({ settingsPanel, setSettingsPanel }),
      contentTree,
      navWidth,
    }),
    [
      editing,
      editorState,
      api,
      domain,
      page,
      pageSettingsData,
      nav,
      initNav,
      footer,
      initFooter,
      settingsData,
      user,
      settingsPanel,
      navWidth,
    ]
  );

  useEffect(() => {
    Promise.all([api.app.domain.loadForCurrentHost(), api.security.verify()])
      .then(([domain, user]) => {
        setDomain(domain);
        setUser(user);
        return Promise.all([api.site.footer.load({ domain }), api.site.nav.load({ domain })]).then(([footer, nav]) => {
          setFooter({
            ...footer,
            content: initFooter(footer?.content || {}),
          });
          setNav({ ...nav });
        });
      })
      .catch(err => setError(err));
  }, [api, initFooter, initNav]);

  const checkWhpptUser = () => {
    //TODO work this out better
    if (user._id === 'guest') return false;
    return true;
  };

  useEffect(() => {
    const isDraft = process.env.NEXT_PUBLIC_DRAFT === 'true';
    setRenderChildren(!isDraft || (user && user._id !== 'guest'));
  }, [setRenderChildren, user]);

  useEffect(() => {
    setNavWidth(showFullNav ? '256px' : '96px');
  }, [navWidth, showFullNav]);

  return (
    <div>
      <Whppt.Provider value={context}>
        <div className={`whppt-app ${lightMode ? 'whppt-lightMode' : ''}`}>
          {process.env.NEXT_PUBLIC_DRAFT === 'true' ? (
            <>
              {checkWhpptUser() ? (
                <>
                  <WhpptMainNav
                    lightMode={lightMode}
                    showFullNav={showFullNav}
                    menuItems={menuItems}
                    setLightMode={() => setLightMode(!lightMode)}
                    setShowFullNav={() => setShowFullNav(!showFullNav)}
                  />
                  <SettingsPanel showFullNav={showFullNav} />
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
