import React, { FC, ReactElement } from 'react';
import { WhpptIcon } from '../ui/components/Icon';
import { useWhppt } from '../Context';
import { WhpptNewPageEditorPanel } from './Panels';

export type WhpptAppEditorsArg = ({
  editor,
  value,
  onChange,
  options,
}: {
  editor: string;
  value: any;
  onChange: (value: any) => void;
  options: any;
}) => ReactElement;

export type WhpptEditorPanelArgs = {
  editors: WhpptAppEditorsArg;
};
export type WhpptEditorPanel = FC<WhpptEditorPanelArgs>;

export const WhpptEditorPanel: FC<WhpptEditorPanelArgs> = ({ editors }) => {
  const { editorState, hideEditor } = useWhppt();

  const selectingEditor = () => {
    if (editorState.editor === 'newPage') return <WhpptNewPageEditorPanel />;
    return editors(editorState);
  };

  return (
    <div className={`whppt-editor ${editorState.editor ? 'whppt-editor--active' : ''}`}>
      <div className="whppt-editor__content-wrapper">
        <div className="whppt-editor__header">
          {editorState.options ? editorState.options.label : 'Whppt Editor'}
          <button className="whppt-editor__header--button" onClick={hideEditor}>
            <WhpptIcon is="close"></WhpptIcon>
          </button>
        </div>
        <div className="whppt-editor__content">{selectingEditor()}</div>
      </div>
    </div>
  );
};
