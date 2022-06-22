import React, { FC, useContext } from "react";
import { Whppt } from "../Context";

export const WhpptMainNav: FC = ({}) => {
  const { toggleEditing } = useContext(Whppt);

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
