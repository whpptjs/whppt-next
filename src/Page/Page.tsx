import React, { ReactElement, useEffect } from 'react';
import { ContentTreeNode } from '../ui/Content';

import { useWhppt } from '../Context';
import { PageData } from './Model/Page';

export type WhpptPageProps<T extends PageData> = {
  getContents: (args: { page: T; setPage: (page: T) => void }) => ContentTreeNode[];
  children: ReactElement | ReactElement[];
};

export const WhpptPage = <T extends PageData = PageData>({ getContents, children }: WhpptPageProps<T>) => {
  const { page, setPage, contentTree } = useWhppt();

  useEffect(() => {
    contentTree.setGetTree(_page => getContents({ page: _page as T, setPage }));
  }, [setPage, contentTree, getContents]);

  return page ? (
    <div className={`bg-${(page.backgroundColour && page.backgroundColour.value) || 'whpptDefault'}`}>{children}</div>
  ) : (
    <div>Page failed to load</div>
  );
};
