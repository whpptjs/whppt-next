import React, { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useWhppt } from "../Context";
import { Page } from "../Models/Page";

export const WhpptPage: FC<{
  children: (page: Page, setPage: (page: Page) => void) => ReactElement;
}> = ({ children }) => {
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
  });

  if (loading) return <div>Page is loading</div>;
  if (error) return <div className="whppt-error">{error}</div>;

  return page ? (
    <div>{children(page, (updatedPage) => setPage(updatedPage))}</div>
  ) : (
    <div>Page failed to load</div>
  );
};
