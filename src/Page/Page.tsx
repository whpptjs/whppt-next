import React, { ReactElement, useEffect, useState } from 'react';
import { ContentTreeNode } from '../ui/Content';

import { useWhppt } from '../Context';
import { PageData } from './Model/Page';

export type WhpptPageProps<T extends PageData> = {
  init: (page: T) => T;
  getContents: (args: { page: T; setPage: (page: T) => void }) => ContentTreeNode[];
  slug: string;
  collection?: string;
  children: ({ page, setPage }: { page: T; setPage: (page: T) => void }) => ReactElement;
};

export const WhpptPage = <T extends PageData = PageData>({ slug, getContents, collection, children, init }: WhpptPageProps<T>) => {
  const { api, page, setPage, domain, contentTree } = useWhppt();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    if (!domain._id) return;
    api.page
      .loadFromSlug({ slug, collection, domain })
      .then(loadedPage => {
        const initialisedPage = init(loadedPage as T);
        setPage(initialisedPage);
        contentTree.setGetTree(_page => getContents({ page: _page as T, setPage }));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [domain, slug, api.page, collection, setPage, init, getContents, contentTree]);

  if (loading) return <div>Page is loading</div>;
  if (error) return <div className="whppt-error">{error} test</div>;

  return page ? (
    <div>
      {children({
        page: page as T,
        setPage: updatedPage => setPage(updatedPage),
      })}
    </div>
  ) : (
    <div>Page failed to load</div>
  );
};
