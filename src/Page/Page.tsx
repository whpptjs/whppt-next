import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useWhppt } from "../Context";
import { PageData } from "./Model/Page";

export type WhpptPageProps<T extends PageData> = {
  children: ({
    page,
    setPage,
  }: {
    page: T;
    setPage: (page: T) => void;
  }) => ReactElement;
};

export const WhpptPage = <T extends PageData = PageData>({
  children,
}: WhpptPageProps<T>) => {
  const { api, page, setPage } = useWhppt();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.page
      .loadFromSlug(router.pathname)
      .then((loadedPage) => {
        setPage(loadedPage);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Page is loading</div>;
  if (error) return <div className="whppt-error">{error}</div>;

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
