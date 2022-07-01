import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Whppt } from "./Context";
import type { WhpptAppEditorsArg } from "./Editor/EditorPanel";
import { WhpptMainNav } from "./MainNav";
import { Api } from "./Api";
import * as editor from "./Editor/Context";
import * as pageContext from "./Page/Context";
import * as footerContext from "./Footer/Context";
import { Footer } from "./Models";
import { Domain } from "./App/Model/Domain";

export type WhpptAppOptions = {
  children: ReactElement[];
  editors: WhpptAppEditorsArg;
  error: (error: Error) => ReactElement;
  initNav?: (nav: any) => void;
  initFooter?: (footer: Footer) => void;
};

export const WhpptApp: FC<WhpptAppOptions> = ({
  children,
  editors,
  error,
  // initNav,
  initFooter,
}) => {
  const [errorState, setError] = useState<Error>();
  const [domain, setDomain] = useState<Domain>();
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState(editor.defaultState);
  const [page, setPage] = useState(pageContext.defaultState);
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
      domain,
      ...pageContext.Context({ page, setPage }),
      ...footerContext.Context({ footer, setFooter, initFooter: initFooter }),
    }),
    [editing, editorState, page, footer, domain]
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
        <WhpptMainNav />
        {errorState ? (
          error(errorState)
        ) : (
          <div>
            {children}
            <div>{editors(context.editorState)}</div>)
          </div>
        )}
      </Whppt.Provider>
    </div>
  );
};
