import React, { FC } from 'react';
import { useWhppt } from '../../index';

export const WhpptChangeHeaderEditorPanel: FC = () => {
  const { setPage, page } = useWhppt();

  const changeHeader = (type: string) => {
    setPage({ ...page, header: { ...page.header, type } });
  };

  return (
    <div>
      <div>
        <button className="whppt-content__item" onClick={() => changeHeader('')}>
          Default
        </button>
      </div>
      <div>
        <button className="whppt-content__item" onClick={() => changeHeader('pictureHeader')}>
          Picture Header
        </button>
      </div>
      <div>
        <button className="whppt-content__item" onClick={() => changeHeader('newsEventsHeader')}>
          News/Events Header
        </button>
      </div>
    </div>
  );
};
