import React, { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useWhppt } from "../Context";
import { Site } from "./Site";

export const WhpptSite: FC<{
  children: (site: Site, setSite: (site: Site) => void) => ReactElement;
}> = ({ children }) => {
  const { api, site, setSite } = useWhppt();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.site
      .loadFromSlug(router.pathname)
      .then((loadedSite) => {
        setSite(loadedSite);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) return <div>Site is loading</div>;
  if (error) return <div className="whppt-error">{error}</div>;

  return site ? (
    <div>{children(site, (updatedSite) => setSite(updatedSite))}</div>
  ) : (
    <div>Site failed to load</div>
  );
};
