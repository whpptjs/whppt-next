import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useWhppt } from '../Context';
import { PageData } from './Model/Page';

export type WhpptPageProps<T extends PageData> = {
  collection?: string;
  children: ({ page, setPage }: { page: T; setPage: (page: T) => void }) => ReactElement;
  init: (page: PageData) => PageData;
};

export const WhpptPage = <T extends PageData = PageData>({ collection, children, init }: WhpptPageProps<T>) => {
  const { api, page, setPage, domain } = useWhppt();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    if (!domain._id) return;
    api.page
      .loadFromSlug({ slug: router.pathname, collection, domain })
      .then(loadedPage => {
        setPage(init(loadedPage));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [domain, api.page, router, collection, setPage, init]);

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
