import React, { FC, ReactElement } from 'react';
import { WhpptIcon } from '../ui/components/Icon';
import { useWhppt } from '../Context';

export type WhpptAppEditorsArg = ({
  editor,
  value,
  onChange,
  initalValue,
}: {
  editor: string;
  value: any;
  onChange: (value: any) => void;
  initalValue?: any;
}) => ReactElement;

export type WhpptEditorPanelArgs = {
  editors: WhpptAppEditorsArg;
};
export type WhpptEditorPanel = FC<WhpptEditorPanelArgs>;

export const WhpptEditorPanel: FC<WhpptEditorPanelArgs> = ({ editors }) => {
  const { editorState, editing } = useWhppt();

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
