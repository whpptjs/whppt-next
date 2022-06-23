import React, { FC, ReactElement, useMemo, useState } from 'react';
import { Whppt } from './Context';
import type { WhpptAppEditorsArg } from './EditorPanel';
import { WhpptMainNav } from './MainNav';

export type WhpptAppOptions = {
  children: ReactElement[];
  editors: WhpptAppEditorsArg;
};

export const WhpptApp: FC<WhpptAppOptions> = ({ children, editors }) => {
  const [lightMode, setLightMode] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState<{
    editor: string;
    value: any;
    onChange: (value: any) => void;
  }>({ editor: '', value: undefined, onChange: () => {} });

  const context = useMemo(
    () => ({
      editing,
      toggleEditing: () => {
        setEditing(!editing);
      },
      editorState,
      showEditor: (
        editor: string,
        value: any,
        onChange: (value: any) => void
      ) => {
        if (!editing) return;
        const internalOnChange = (changedValue: any) => {
          setEditorState({
            editor,
            onChange: internalOnChange,
            value: changedValue,
          });
          onChange(changedValue);
        };
        setEditorState({
          editor,
          value,
          onChange: internalOnChange,
        });
      },
    }),
    [editing, editorState]
  );

  return (
    <div>
      <Whppt.Provider value={context}>
        <div className={`whppt-app ${lightMode ? 'whppt-lightMode' : ''}`}>
          <WhpptMainNav setLightMode={() => setLightMode(!lightMode)} />
          {children}
          <div>{editors(editorState)}</div>
        </div>
      </Whppt.Provider>
    </div>
  );
};
