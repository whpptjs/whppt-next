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
        <button onClick={() => changeHeader('')}>Default</button>
      </div>
      <div>
        <button onClick={() => changeHeader('pictureHeader')}>Picture</button>
      </div>
    </div>
  );
};
