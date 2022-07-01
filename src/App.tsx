import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Whppt } from './Context';
import type { WhpptAppEditorsArg } from './Editor/EditorPanel';
import { WhpptEditorPanel } from './Editor/EditorPanel';
import { SettingsPanel } from './ui/SettingsPanel';
import { WhpptMainNav } from './ui/MainNav';
import { Api } from './Api';
import * as editor from './Editor/Context';
import * as appContext from './App/Context';
import * as pageContext from './Page/Context';
import * as footerContext from './Footer/Context';
import { Footer } from './Models';

export type WhpptAppOptions = {
  children: ReactElement[];
  editors: WhpptAppEditorsArg;
  error: (error: Error) => ReactElement;
  initNav?: (nav: any) => void;
  initFooter?: (footer: Footer) => void;
};
export type WhpptApp = FC<WhpptAppOptions>;

export const WhpptApp: FC<WhpptAppOptions> = ({
  children,
  editors,
  error,
  // initNav,
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
  const [footer, setFooter] = useState(pageContext.defaultState);

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
      ...footerContext.Context({ footer, setFooter, initFooter: initFooter }),
    }),
    [editing, editorState, page, footer, domain, pageSettings, appSettings]
  );

  useEffect(() => {
    context.api.app.domain
      .loadForCurrentHost()
      .then((domain) => setDomain(domain))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      <Whppt.Provider value={context}>
        <div className={`whppt-app ${lightMode ? 'whppt-lightMode' : ''}`}>
          <WhpptMainNav
            lightMode={lightMode}
            showFullNav={showFullNav}
            setLightMode={() => setLightMode(!lightMode)}
            setShowFullNav={() => setShowFullNav(!showFullNav)}
          />
          <SettingsPanel showFullNav={showFullNav} />
          {errorState ? (
            error(errorState)
          ) : (
            <div className="whppt-app__content">
              <div>{children}</div>
              <WhpptEditorPanel editors={editors}></WhpptEditorPanel>
            </div>
          )}
        </div>
      </Whppt.Provider>
    </div>
  );
};
