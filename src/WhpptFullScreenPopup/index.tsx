import React, { FC } from 'react';
// import { Whppt } from './Context';
import { WhpptIcon } from '../Icon';

export const WhpptFullScreenPopup: FC = () => {
  // const { editorState, editing } = useContext(Whppt);

  return (
    <div className={`whppt-popup whppt-popup--active`}>
      {/* <div
      className={`whppt-editor ${
        editorState.editor && editing ? 'whppt-editor--active' : ''
      }`}
    > */}
      <div className="whppt-popup__header">
        Whppt Editor
        <button className="whppt-popup__header--button">
          <WhpptIcon is="close"></WhpptIcon>
        </button>
      </div>
      <div className="whppt-popup__contents">
        <div className="whppt-popup__contents--left">
          <div className="whppt-popup__tab">General</div>
          <div className="whppt-popup__tab ">Tab 2</div>
          <div className="whppt-popup__tab  whppt-popup__tab--active">
            Tab 3
          </div>
          <div className="whppt-popup__tab ">Tab 4</div>
        </div>
        <div className="whppt-popup__contents--right">Tab Content</div>
      </div>
    </div>
  );
};
