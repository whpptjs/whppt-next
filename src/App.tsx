import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Whppt } from "./Context";
import type { WhpptAppEditorsArg } from "./Editor/EditorPanel";
import { WhpptEditorPanel } from "./Editor/EditorPanel";
import { SettingsPanel } from "./ui/SettingsPanel";
import { WhpptMainNav } from "./ui/MainNav";
import { Api } from "./Api";
import * as editor from "./Editor/Context";
import * as pageContext from "./Page/Context";
import * as footerContext from "./Footer/Context";
import * as siteContext from "./Site/Context";
import { Footer } from "./Models";
import { Domain } from "./App/Model/Domain";

export type WhpptAppOptions = {
  children: ReactElement[];
  editors: WhpptAppEditorsArg;
  error?: (error: Error) => ReactElement;
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
  const [domain, setDomain] = useState<Domain>();
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState(editor.defaultState);
  const [page, setPage] = useState(pageContext.defaultState);
  const [pageSettings, setPageSettings] = useState(
    pageContext.defaultPageSettingsState
  );
  const [footer, setFooter] = useState(pageContext.defaultState);
  const [site, setSite] = useState(siteContext.defaultState);
  const [siteSettings, setSiteSettings] = useState(siteContext.defaultSiteSettingsState);

  const context = useMemo(
    () => ({
      ...editor.Context({
        editing,
        setEditing,
        editorState,
        setEditorState,
      }),
      api: Api(),
      domain,
      ...pageContext.Context({
        page,
        setPage,
        pageSettings,
        setPageSettings,
      }),
      ...footerContext.Context({ footer, setFooter, initFooter: initFooter }),
      ...siteContext.Context({
        site,
        setSite,
        siteSettings,
        setSiteSettings,
      })
    }),
    [editing, editorState, page, footer, domain, pageSettings, site, siteSettings]
  );

  useEffect(() => {
    context.api.app.domain
      .loadForCurrentHost()
      .then((domain) => {
        setDomain(domain);
      })
      .catch(setError);
  }, []);

  return (
    <div>
      <Whppt.Provider value={context}>
        <div className={`whppt-app ${lightMode ? "whppt-lightMode" : ""}`}>
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
            <div>
              <div className="whppt-app__content">
                <div>{children}</div>
                <WhpptEditorPanel editors={editors}></WhpptEditorPanel>
              </div>
            </div>
          )}
        </div>
      </Whppt.Provider>
    </div>
  );
};
