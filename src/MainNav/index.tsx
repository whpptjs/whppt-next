import React, { FC } from "react";
import { useWhppt } from "../Context";

export const WhpptMainNav: FC = ({}) => {
  const { toggleEditing } = useWhppt();

  return (
    <div className="whppt-main-nav">
      <ul>
        <li>Collapse</li>
        <li onClick={() => toggleEditing()}>Toggle Editor</li>
        <li>Log Out</li>
      </ul>
    </div>
  );
};
