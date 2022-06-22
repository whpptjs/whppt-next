import React, { FC, ReactElement, useContext } from "react";
import { Whppt } from "./Context";

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
  const { editorState } = useContext(Whppt);
  return <div className="whppt-editor-panel">{editors(editorState)}</div>;
};
