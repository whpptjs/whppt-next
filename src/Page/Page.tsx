import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useWhppt } from '../Context';
import { PageData } from './Model/Page';

export type WhpptPageProps<T extends PageData> = {
  collection?: string;
  children: ({
    page,
    setPage,
  }: {
    page: T;
    setPage: (page: T) => void;
  }) => ReactElement;
};

export const WhpptPage = <T extends PageData = PageData>({
  collection,
  children,
}: WhpptPageProps<T>) => {
  const { api, page, setPage, domain } = useWhppt();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getSlug = () => {
    return router.pathname === "/" ? "" : router.pathname;
  }

  useEffect(() => {
    setLoading(true);
    setError('');

    api.page
      .loadFromSlug({ slug: getSlug(), collection, domain })
      .then((loadedPage) => {
        setPage(loadedPage);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [domain]);

  if (loading) return <div>Page is loading</div>;
  if (error) return <div className="whppt-error">{error} test</div>;

  return page ? (
    <div>
      {children({
        page: page as T,
        setPage: (updatedPage) => setPage(updatedPage),
      })}
    </div>
  ) : (
    <div>Page failed to load</div>
  );
};
