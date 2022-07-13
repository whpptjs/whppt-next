import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Whppt } from './Context';
import type { WhpptAppEditorsArg } from './Editor/EditorPanel';
import { WhpptEditorPanel } from './Editor/EditorPanel';
import { SettingsPanel } from './ui/SettingsPanel';
import { WhpptMainNav } from './ui/MainNav';
import { Api } from './Api';
import { WhpptLogin } from './ui/Login';

import * as editor from './Editor/Context';
import * as appContext from './App/Context';
import * as siteContext from './Site/Context';
import * as pageContext from './Page/Context';
import * as securityContext from './Security/Context';
import * as dashboardContext from './Dashboard/Context';

export type WhpptAppOptions = {
  children: ReactElement[] | ReactElement;
  editors: WhpptAppEditorsArg;
  error: (error: Error) => ReactElement;
  initNav?: (nav: any) => any;
  initFooter?: (footer: any) => any;
};
export type WhpptApp = FC<WhpptAppOptions>;

export const WhpptApp: FC<WhpptAppOptions> = ({
  children,
  editors,
  error,
  initNav,
  initFooter,
}) => {
  const [lightMode, setLightMode] = useState(false);
  const [showFullNav, setShowFullNav] = useState(false);
  const [errorState, setError] = useState<Error>();
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState(editor.defaultState);
  const [domain, setDomain] = useState(appContext.defaultState);
  const [page, setPage] = useState(pageContext.defaultState);
  const [appSettings, setAppSettings] = useState(
    appContext.defaultAppSettingsState
  );
  const [pageSettings, setPageSettings] = useState(
    pageContext.defaultPageSettingsState
  );
  const [nav, setNav] = useState(siteContext.defaultNavState);
  const [footer, setFooter] = useState(siteContext.defaultFooterState);
  const [siteSettings, setSiteSettings] = useState(
    siteContext.defaultSiteSettingsState
  );
  const [dashboard, setDashboard] = useState(dashboardContext.defaulDashboardState);
  const [user, setUser] = useState(securityContext.defaultState);

  const context = useMemo(
    () => ({
      ...editor.Context({
        editing,
        setEditing,
        editorState,
        setEditorState,
      }),
      api: Api(),
      ...appContext.Context({
        domain,
        setDomain,
        appSettings,
        setAppSettings,
      }),
      domain,
      ...pageContext.Context({
        page,
        setPage,
        pageSettings,
        setPageSettings,
      }),
      ...siteContext.Context({
        siteSettings,
        setSiteSettings,
        nav,
        setNav,
        initNav,
        footer,
        setFooter,
        initFooter,
      }),
      ...dashboardContext.Context({
        dashboard,
        setDashboard
      }),
      ...securityContext.Context({ user, setUser }),
    }),
    [
      editing,
      editorState,
      page,
      footer,
      nav,
      domain,
      pageSettings,
      appSettings,
      siteSettings,
      user,
      dashboard
    ]
  );

  useEffect(() => {
    Promise.all([
      context.api.app.domain.loadForCurrentHost(),
      context.api.security.verify(),
    ])
      .then(([domain, user]) => {
        setDomain(domain);
        setUser(user);
        return Promise.all([
          context.api.site.footer.load({ domain }),
          context.api.site.nav.load({ domain }),
        ]).then(([footer, nav]) => {
          setFooter({
            ...footer,
            content: context.initFooter(footer?.content || {}),
          });
          setNav({ ...nav, content: context.initNav(nav?.content || {}) });
        });
      })
      .catch((err) => setError(err));
  }, []);

  const checkWhpptUser = () => {
    //TODO work this out better
    if (user._id === 'guest') return false;
    return true;
  };

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
                    setLightMode={() => setLightMode(!lightMode)}
                    setShowFullNav={() => setShowFullNav(!showFullNav)}
                  />
                  <SettingsPanel showFullNav={showFullNav} />
                </>
              ) : (
                <WhpptLogin />
              )}
            </>
          ) : (
            <></>
          )}
          {errorState ? (
            error(errorState)
          ) : (
            <div className="whppt-app__content">
              <div>{children}</div>
              {process.env.NEXT_PUBLIC_DRAFT === 'true' ? (
                <WhpptEditorPanel editors={editors}></WhpptEditorPanel>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </Whppt.Provider>
    </div>
  );
};
