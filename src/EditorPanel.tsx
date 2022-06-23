import React, { FC, ReactElement, useContext } from 'react';
import { Whppt } from './Context';
import { WhpptIcon } from './Icon';

export type WhpptAppEditorsArg = ({
  editor,
  value,
  onChange,
}: {
  editor: string;
  value: any;
  onChange: (value: any) => void;
}) => ReactElement;

export type WhpptEditorPanelArgs = {
  editors: WhpptAppEditorsArg;
};

export const WhpptEditorPanel: FC<WhpptEditorPanelArgs> = ({ editors }) => {
  const { editorState, editing } = useContext(Whppt);

  return (
    <div
      className={`whppt-editor ${
        editorState.editor && editing ? 'whppt-editor--active' : ''
      }`}
    >
      <div className="whppt-editor__content-wrapper">
        <div className="whppt-editor__header">
          Whppt Editor
          <button className="whppt-editor__header--button">
            <WhpptIcon is="close"></WhpptIcon>
          </button>
        </div>
        <div className="whppt-editor__content">{editors(editorState)}</div>
      </div>
    </div>
  );
};
