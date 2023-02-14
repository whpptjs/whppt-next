import React, { FC, useEffect, useState } from 'react';
import { SitemapData } from '../../Site/Api/sitemap';
import { useWhppt } from '../../Context';
import { WhpptInput, WhpptLinkData, WhpptSelect, WhpptTab } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';

export const PageLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({ value, onChange }) => {
  const { api, domain } = useWhppt();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [items, setItems] = useState([] as SitemapData[]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api.site.sitemap
      .load({ domain, page: 1, size: 100 })
      .then(result => setItems(result.sitemap))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [api.site.sitemap, domain]);

  if (loading) return <div>Loading pages ...</div>;
  if (error) return <div className="whppt-error">There was an error loading pages</div>;

  return (
    <form className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id="whppt-editor-link-text"
          label="Text to show in the link"
          type="text"
          error=""
          info=""
          value={value.text}
          onChange={text => onChange({ ...value, text, fileId: undefined })}
        />

        <WhpptSelect
          id="whppt-editor-link-href"
          label="Page to link to"
          items={items}
          value={items.find(i => i.slug === value.href)}
          onChange={item => onChange({ ...value, href: item.slug, fileId: undefined })}
          getOptionLabel={item => `/${item.slug}`}
        />
      </section>
    </form>
  );
};
