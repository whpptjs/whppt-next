import React, { FC, ReactElement } from 'react';
import { WhpptIcon } from '../ui/components/Icon';
import { useWhppt } from '../Context';
import { WhpptNewPageEditor } from '../editors/NewPage';

export type WhpptAppEditorsArg = ({
  editor,
  value,
  onChange,
  options,
}: {
  editor: string;
  value: any;
  onChange: (value: any) => void;
  options?: any;
}) => ReactElement;

export type WhpptEditorPanelArgs = {
  editors: WhpptAppEditorsArg;
};
export type WhpptEditorPanel = FC<WhpptEditorPanelArgs>;

export const WhpptEditorPanel: FC<WhpptEditorPanelArgs> = ({ editors }) => {
  const { editorState, editing, hideEditor } = useWhppt();

  const checkIfAppEditor = () => {
    if (editorState.editor === 'newPage') return <WhpptNewPageEditor />;
    return { editors(editorState); };
  };

  return (
    <div
      className={`whppt-editor ${
        editorState.editor && editing ? 'whppt-editor--active' : ''
      }`}
    >
      <div className="whppt-editor__content-wrapper">
        <div className="whppt-editor__header">
          Whppt Editor
          <button className="whppt-editor__header--button" onClick={hideEditor}>
            <WhpptIcon is="close"></WhpptIcon>
          </button>
        </div>
        <div className="whppt-editor__content">
          {editorState.editor === 'newPage' && <WhpptNewPageEditor />}
          {editors(editorState)}
        </div>
      </div>
    </div>
  );
};
