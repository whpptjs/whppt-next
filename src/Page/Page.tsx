import React, { ReactElement, useEffect, useState } from 'react';
import { ContentTreeNode } from '../ui/Content';

import { useWhppt } from '../Context';
import { PageData } from './Model/Page';
import { defaultPageSettingsData } from './Context';

export type WhpptPageProps<T extends PageData> = {
  init: (page: T) => T;
  getContents: (args: { page: T; setPage: (page: T) => void }) => ContentTreeNode[];
  slug: string | undefined;
  collection?: string;
  children: ({ page, setPage }: { page: T; setPage: (page: T) => void }) => ReactElement;
};

export const WhpptPage = <T extends PageData = PageData>({ slug, getContents, collection, children, init }: WhpptPageProps<T>) => {
  const { api, page, setPage, setPageSettingsData, domain, contentTree } = useWhppt();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const whpptPageInit = _page => {
    _page.settings = _page.settings || defaultPageSettingsData;
    _page.header = _page.header || { type: '' };
  };

  useEffect(() => {
    setLoading(true);
    setError('');
    if (!domain._id || !slug) return;
    api.page
      .loadFromSlug({ slug, collection, domain })
      .then(loadedPage => {
        const initialisedPage = init(loadedPage as T);
        whpptPageInit(initialisedPage);
        setPage(initialisedPage);
        contentTree.setGetTree(_page => getContents({ page: _page as T, setPage }));
        setPageSettingsData(initialisedPage.settings);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [domain, slug, api.page, collection, setPage, init, getContents, contentTree, setPageSettingsData]);

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
