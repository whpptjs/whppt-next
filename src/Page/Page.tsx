import React, { ReactElement, useEffect, useState } from 'react';
import { ComponentData } from '../ui/Content';

import { useWhppt } from '../Context';
import { PageData } from './Model/Page';

export type WhpptPageProps<T extends PageData> = {
  slug: string;
  getContents: (page: T) => ComponentData[][];
  collection?: string;
  children: ({ page, setPage }: { page: T; setPage: (page: T) => void }) => ReactElement;
  init: (page: T) => T;
};

export const WhpptPage = <T extends PageData = PageData>({ slug, getContents, collection, children, init }: WhpptPageProps<T>) => {
  const { api, page, setPage, domain, setContentsTree, contentsTree } = useWhppt();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    if (!domain._id) return;
    api.page
      .loadFromSlug({ slug, collection, domain })
      .then(loadedPage => {
        setPage(init(loadedPage as T));
        const x = () => getContents(loadedPage as T);
        console.log('🚀 ~ file: Page.tsx ~ line 29 ~ useEffect ~ x', x);
        setContentsTree(x);
        console.log('🚀 ~ file: Page.tsx ~ line 17 ~ ontentsTree', contentsTree);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [domain, slug, api.page, collection, setPage, init, setContentsTree, getContents]);

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
